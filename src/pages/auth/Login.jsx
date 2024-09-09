import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: loginUser } = useAuth();

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
    try {
      const response = await authLogin(email, password);
      if (response.status === 200) {
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
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
        }}
        className="w-[60%] h-[65%] flex items-center"
      >
        <div className="w-[50%] h-full rounded-md">
          <img
            className="w-full h-full object-cover rounded-l-md"
            src="/logo-image.jpeg"
            alt="logo-image"
          />
        </div>
        <div className="w-[50%] h-full flex flex-col items-center p-[20px]">
          <form onSubmit={login} className="w-full h-full">
            <p className="text-[20px] text-left">Login</p>
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full mb-[20px]">
              <button className="h-[50px] w-full rounded-[5px] text-white bg-[#12B981]">
                Login
              </button>
            </div>
            <div className="border border-gray-300 mb-[20px]"></div>
            <div className="flex flex-col gap-[10px]">
              <Link
                className="text-[14px] text-[#0000FF] underline"
                to="/auth/forget-password"
              >
                Forget password?
              </Link>
              <Link
                className="text-[14px] text-[#0000FF] underline"
                to="/auth/register"
              >
                Don't have an account? Register here
              </Link>
            </div>
          </form>
          <div className="w-full flex flex-col gap-[20px] mb-[20px]">
            <button
              onClick={facebookLogin}
              className="h-[50px] w-full flex items-center justify-center gap-[10px] rounded-[5px] text-[#000] hover:text-white hover:bg-[#0000FF] bg-[#F3F4F6]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="#1877f2"
                  d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                />
                <path
                  fill="#fff"
                  d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                />
              </svg>
              Login with Facebook
            </button>
            <button
              onClick={handleSignIn}
              className="h-[50px] w-full flex items-center justify-center gap-[10px] rounded-[5px] text-[#000] hover:text-white hover:bg-[#f00] bg-[#F3F4F6]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  color="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 12h5a5 5 0 1 1-1.464-3.536" />
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
