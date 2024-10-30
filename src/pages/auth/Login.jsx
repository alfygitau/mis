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
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
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
          FTMA (Farm to Market Alliance)
        </p>
        <p className="text-white text-[30px]">
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
            <p className="text-[20px] mb-[30px] text-left">
              Welcome to Farm to Market Alliance
            </p>
            <div className="w-full flex flex-col gap-[5px] mb-[30px]">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[40px]">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-[50px] w-full text-[14px]  border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full mb-[20px]">
              <button className="h-[50px] w-full flex items-center justify-center gap-[10px]  text-white bg-[#12B981]">
                {loading && (
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            {/* <div className="border border-gray-300 mb-[20px]"></div> */}
            <div className="flex justify-end w-full gap-[10px]">
              <Link
                className="text-[14px] text-[#0000FF] underline"
                to="/auth/forget-password"
              >
                Forget password?
              </Link>
              {/* <Link className="text-[14px] text-[#0000FF] underline" to="#">
                Don't have an account? Register here
              </Link> */}
            </div>
          </form>
          {/* <div className="w-full flex flex-col gap-[20px] mb-[20px]">
            <button
              onClick={facebookLogin}
              className="h-[50px] w-full flex items-center justify-center gap-[10px]  text-[#000] hover:text-white hover:bg-[#0000FF] bg-[#F3F4F6]"
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
              className="h-[50px] w-full flex items-center justify-center gap-[10px]  text-[#000] hover:text-white hover:bg-[#f00] bg-[#F3F4F6]"
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
