import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth, signOut } from "../../storage/firebase";
import {
  AppstoreOutlined,
  FileMarkdownOutlined,
  ShoppingOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
    navigate("/");
  };

  const items = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Fscs",
      children: [
        {
          key: "21",
          label: "All Fscs",
        },
        {
          key: "22",
          label: "Add Fsc",
        },
      ],
    },
    {
      key: "3",
      icon: <ShoppingOutlined />,
      label: "Products",
      children: [
        {
          key: "31",
          label: "All products",
        },
        {
          key: "32",
          label: "County products",
        },
        {
          key: "33",
          label: "Product prices",
        },
        {
          key: "34",
          label: "Product price ranges",
        },
        {
          key: "35",
          label: "Add county products",
        },
        {
          key: "36",
          label: "Add county products price range",
        },
      ],
    },
    {
      key: "4",
      icon: <FileMarkdownOutlined />,
      label: "Markets",
      children: [
        {
          key: "41",
          label: "All Markets",
        },
        {
          key: "42",
          label: "Add a Market",
        },
      ],
    },
    {
      key: "5",
      icon: <UserSwitchOutlined />,
      label: "Users",
      children: [
        {
          key: "43",
          label: "All Users",
        },
      ],
    },
  ];

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };
  const levelKeys = getLevelKeys(items);
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const onMenuClick = (info) => {
    switch (info.key) {
      case "21":
        navigate("/dashboard/contributors");
        break;
      case "22":
        navigate("/dashboard/contributors/add-fsc");
        break;
      case "31":
        navigate("/dashboard/products");
        break;
      case "32":
        navigate("/dashboard/products/county-products");
        break;
      case "33":
        navigate("/dashboard/products/products-prices");
        break;
      case "34":
        navigate("/dashboard/products/add-county-product-price-range");
        break;
      case "35":
        navigate("/dashboard/products/add-county-product");
        break;
      case "36":
        navigate("/dashboard/products/add-county-product-price-range");
        break;
      case "41":
        navigate("/dashboard/markets");
        break;
      case "42":
        navigate("/dashboard/markets/add-market");
        break;
      case "43":
        navigate("/dashboard/users");
        break;
      default:
        navigate("/dashboard");
    }
  };
  return (
    <div className="flex bg-[#fcb040] px-[10px] h-full flex-col">
      <div className="h-[100px] flex mb-[30px] items-center">
        <div className="w-full h-full">
          <img
            onClick={() => navigate("/dashboard")}
            className="w-[75%] cursor-pointer object-cover"
            src="/mis-removebg-preview.png"
            alt="mis_logo"
          />
        </div>
      </div>
      <div className="flex flex-col gap-[40px]">
        <Menu
          style={{ fontSize: "16px", fontFamily: "Poppins" }}
          mode="inline"
          defaultSelectedKeys={["231"]}
          openKeys={stateOpenKeys}
          onClick={onMenuClick}
          onOpenChange={onOpenChange}
          items={items}
        />
      </div>
      <div className="flex flex-col text-white px-[20px] h-full mb-[30px] justify-end sm:hidden gap-[20px]">
        <NavLink
          end
          to="/dashboard/partners"
          activeClassName="active-link"
          className="flex items-center gap-[10px]"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "white",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M8.716.315a1 1 0 0 0-1.432 0L6.646.97a1 1 0 0 1-.988.265l-.88-.248a1 1 0 0 0-1.24.716l-.226.886a1 1 0 0 1-.723.723l-.886.225a1 1 0 0 0-.716 1.24l.248.881a1 1 0 0 1-.265.988l-.655.638a1 1 0 0 0 0 1.432l.655.639a1 1 0 0 1 .265.987l-.248.88a1 1 0 0 0 .716 1.24l.886.226a1 1 0 0 1 .723.723l.225.886a1 1 0 0 0 1.24.717l.881-.248a1 1 0 0 1 .988.264l.638.655a1 1 0 0 0 1.432 0l.639-.655a1 1 0 0 1 .987-.264l.88.248a1 1 0 0 0 1.24-.717l.226-.886a1 1 0 0 1 .723-.723l.886-.225a1 1 0 0 0 .717-1.24l-.248-.88a1 1 0 0 1 .264-.988l.655-.639a1 1 0 0 0 0-1.432l-.655-.638a1 1 0 0 1-.264-.988l.248-.88a1 1 0 0 0-.717-1.24l-.886-.226a1 1 0 0 1-.723-.723l-.225-.886a1 1 0 0 0-1.24-.716l-.88.248A1 1 0 0 1 9.354.97zm3.057 5.975a.75.75 0 0 0-1.042-1.08L6.597 9.202L5.28 7.887A.75.75 0 0 0 4.22 8.95l1.839 1.834a.75.75 0 0 0 1.05.01z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Our partners</span>
        </NavLink>
        <p
          onClick={handleLogout}
          className="flex cursor-pointer text-white items-center gap-[10px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8c-7 8.5-14.5 16.7-22.4 24.5a353.8 353.8 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.8 353.8 0 0 1-112.7-75.9a353.3 353.3 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8s94.3 9.3 137.9 27.8c42.2 17.8 80.1 43.4 112.7 75.9c7.9 7.9 15.3 16.1 22.4 24.5c3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82C271.7 82.6 79.6 277.1 82 516.4C84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7c3.4-5.3-.4-12.3-6.7-12.3m88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6"
            />
          </svg>
          <span>Logout</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
