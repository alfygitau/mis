import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAUser, getRoles } from "../../sdk/auth/auth";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
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

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        msisdn: msisdn,
        username: email,
        roleId: 1,
      };
      const response = await createAUser(payload);
      if (response.status === 201 || response.status === 200) {
        toast.success("User registered");
        navigate("/");
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
        className="min-w-[60%] max-w-[70%] h-[550px] flex items-center"
      >
        <div className="w-[50%] h-full rounded-md">
          <img
            className="w-full h-full object-cover rounded-l-md"
            src="/logo-image.jpeg"
            alt="logo-image"
          />
        </div>
        <div className="w-[50%] h-full flex flex-col p-[10px]">
          <form onSubmit={createUser} className="w-full h-full">
            <p className="text-[16px] mb-[10px] text-left">Register</p>
            <div className="flex items-center justify-between">
              <div className="w-[49%] flex flex-col gap-[5px] mb-[10px]">
                <label htmlFor="msisdn">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                />
              </div>
              <div className="w-[49%] flex flex-col gap-[5px] mb-[10px]">
                <label htmlFor="msisdn">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[10px]">
              <label htmlFor="msisdn">Phone number</label>
              <input
                type="text"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
                placeholder="Enter your username"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[10px]">
              <label htmlFor="email">Email/username</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                className="h-[50px] w-full text-[14px] rounded-[5px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
              />
            </div>
            <div className="w-full flex flex-col gap-[5px] mb-[10px]">
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
          </form>
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
        </div>
      </div>
    </div>
  );
};

export default Register;
