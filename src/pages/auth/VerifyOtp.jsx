import React, { useState } from "react";
import { InputOTP } from "antd-input-otp";
import { toast } from "react-toastify";
import { verifyMyOtp } from "../../sdk/auth/auth";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [value, setValue] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const verifyPassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await verifyMyOtp(username, value);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success("Otp verified successfully");
        setUsername("");
        setValue("");
        navigate("/auth/reset-password");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div
      style={{
        backgroundImage: "url('/my_data.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
      className="w-[100vw] h-[100vh] flex items-center justify-center"
    >
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
        }}
        className="w-[650px] h-[500px] bg-white rounded p-[40px] flex flex-col justify-center"
      >
        <form onSubmit={verifyPassword}>
          <div className="mb-[20px] flex items-center justify-center">
            <img className="h-[100px]" src="/mynewlogo.png" alt="mis_logo" />
          </div>
          <p className="text-[16px] mb-[10px] font-bold text-center">
            Verify One Time Password
          </p>
          <p className="text-[14px] mb-[20px] text-center">
            Enter the email and the one time password recieved as a text on your
            phone.
          </p>
          <div className="flex flex-col gap-[5px] mb-[20px]">
            <label
              className="text-[14px] text-left text-[#000]"
              htmlFor="username"
            >
              Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g email@example.com"
              className="h-[50px] w-[100%] text-[#000] text-[14px] border px-[10px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-110"
            />
          </div>
          <div className="flex flex-col gap-[5px] mb-[20px]">
            <label className="text-[14px] text-left text-[#000]" htmlFor="otp">
              One Time Password
            </label>
            <InputOTP onChange={setValue} value={value} length={4} />
          </div>
          <div className="w-full">
            <button
              type="submit"
              disabled={loading}
              className="h-[50px] flex items-center justify-center gap-[10px] w-full text-white text-[14px] bg-[#C3B00A]"
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
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
