import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth, signOut } from "../../storage/firebase";
import {
  AppstoreOutlined,
  FileMarkdownOutlined,
  MoneyCollectOutlined,
  ProductFilled,
  ProductOutlined,
  ShoppingOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { icons } from "antd/es/image/PreviewGroup";
import { ImCoinPound } from "react-icons/im";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GrScorecard } from "react-icons/gr";

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
    },
    {
      key: "3",
      icon: <ShoppingOutlined />,
      label: "Commodities",
      children: [
        {
          key: "31",
          label: "Commodities",
          icon: <ProductOutlined />,
        },
        {
          key: "32",
          label: "County commodities",
          icon: <ProductFilled />,
        },
        {
          key: "33",
          label: "Prices",
          icon: <ImCoinPound />,
        },
        {
          key: "34",
          label: "Price ranges",
          icon: <MoneyCollectOutlined />,
        },
      ],
    },
    {
      key: "4",
      icon: <FileMarkdownOutlined />,
      label: "Markets",
    },
    {
      key: "5",
      icon: <UserSwitchOutlined />,
      label: "Users",
    },
    {
      key: "6",
      icon: <GrScorecard />,
      label: "Market Points",
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
      case "1":
        navigate("/dashboard");
        break;
      case "2":
        navigate("/dashboard/contributors");
        break;
      case "4":
        navigate("/dashboard/markets");
        break;
      case "5":
        navigate("/dashboard/users");
        break;
      case "6":
        navigate("/dashboard/market-points");
        break;
      case "21":
        navigate("/dashboard/contributors");
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
        navigate("/dashboard/products/county-product-price-range");
        break;
      case "41":
        navigate("/dashboard/markets");
        break;
      case "43":
        navigate("/dashboard/users");
        break;
      default:
        navigate("/dashboard");
    }
  };
  return (
    <div className="flex w-[100%] px-[40px] mx-auto h-full flex-col">
      <div className="h-[100px] flex mb-[30px] items-center">
        <div className="w-full h-[80px] flex items-center border-b">
          <img
            onClick={() => navigate("/dashboard")}
            className="h-[80%] cursor-pointer object-cover"
            src="/mynewlogo.png"
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
