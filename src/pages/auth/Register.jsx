import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRoles } from "../../sdk/auth/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  const register = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchRoles = async () => {
    console.log("first")
    try {
      const response = await getRoles();
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);
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
          <form onSubmit={register} className="w-full h-full">
            <p className="text-[20px] text-left">Register</p>
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="msisdn">Phone number</label>
              <input
                type="text"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
                placeholder="Enter your username"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[20px]">
              <label htmlFor="email">Email/username</label>
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
              <button
                type="submit"
                className="h-[50px] w-full rounded-[5px] text-white bg-[#12B981]"
              >
                Register
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
              <Link className="text-[14px] text-[#0000FF] underline" to="/">
                You have an account? Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
