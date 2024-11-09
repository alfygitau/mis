import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  auth,
  googleProvider,
  signInWithPopup,
  facebookProvider,
  onAuthStateChanged,
} from "../../storage/firebase";
import { authLogin } from "../../sdk/auth/auth";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(result.user);
        loginUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          token: user.refreshToken,
          phoneNumber: user.phoneNumber,
          idToken: user.getIdToken(),
          provider: user.providerData,
        });
        if (user.displayName) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const facebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log(result.user);
      setUser(result.user);
    } catch (e) {
      console.log(`login error ${e}`);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      if (!emailError && !passwordError) {
        const response = await authLogin(email, password);
        if (response.status === 200) {
          setLoading(false);
          loginUser({
            uid: response.data.data.user,
            name: response.data.data.user,
            photoURL: "",
            token: response.data.data.token,
            idToken: "",
            provider: "",
            user: response.data.data.user,
          });
          toast.success("Success login");
          navigate("/dashboard");
        } else {
          setLoading(false);
          toast.error(response.data.message);
        }
      } else {
        setLoading(false);
        setErrors({ email: emailError, password: passwordError });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      return "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Enter a valid email address.";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required.";
    } else if (value.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value),
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className="w-[100vw] relative h-[100vh] flex items-center justify-center"
      style={{
        backgroundImage: "url('./tractor.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="absolute top-1/2 left-[20%] right-0 -translate-y-1/2">
        <p className="text-[#FFFF00] text-[40px] font-bold">
          Market Information System
        </p>
        <p className="text-white text-[20px]">
          Making markets work better for farmers
        </p>
      </div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
        }}
        className="w-[500px] h-[430px] absolute top-1/2 -translate-y-1/2 right-[10%] bg-white rounded"
      >
        <div className="w-full h-full flex flex-col items-center py-[20px] px-[40px]">
          <form onSubmit={login} className="w-full h-full">
            <p className="text-[20px] mb-[30px] text-left">Welcome to MIS</p>
            <div className="w-full flex flex-col gap-[5px] mb-[30px]">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your username"
                className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[40px]">
              <label htmlFor="password">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="h-[50px] w-full text-[14px] border px-[10px] border-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110 pr-[40px]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="w-full mb-[20px]">
              <button
                disabled={loading}
                className="h-[50px] w-full flex items-center justify-center gap-[10px]  text-white bg-[#A19E3B]"
              >
                {loading && (
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-200 animate-spin dark:text-white fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
                Login
              </button>
            </div>
            <div className="flex justify-end w-full gap-[10px]">
              <Link
                className="text-[14px] text-[#00599A] underline"
                to="/auth/forget-password"
              >
                Forget password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
