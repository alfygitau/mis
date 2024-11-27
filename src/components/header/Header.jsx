import React from "react";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../../storage/firebase";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
    navigate("/");
  };

  const items = [
    {
      label: "Profile",
      key: "0",
    },
    {
      label: "Logout",
      key: "3",
      onClick: handleLogout,
    },
  ];
  return (
    <div className="flex h-full bg-white z-50 pr-[20px] pl-[10px] w-full items-center justify-between">
      <p
        onClick={() => navigate("/dashboard")}
        className="font-bold uppercase cursor-pointer text-[15px]"
      >
        Dashboard
      </p>
      <div className="flex items-center justify-end w-full gap-[15px] h-full">
        <div className="h-full text-[#000] flex items-center pl-[20px]">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space style={{ color: "#000", fontSize: "13px" }}>
                {user?.name ? user?.name : "Profile"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0"
                  />
                </svg>
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
