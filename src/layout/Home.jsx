import React, { useState } from "react";
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="w-[100vw] bg-[#fff] h-[100vh]">
        <div className="w-[100%] mx-auto h-full">
          <div className="flex items-center h-full w-full">
            {/* Sidebar */}
            <div
              className={`transition-all relative duration-300 ${
                isSidebarOpen ? "w-[18%]" : "w-[5%]"
              } bg-[#fff] h-full sm:hidden`}
            >
              <Sidebar isSidebarOpen={isSidebarOpen} />
              <div
                onClick={toggleSidebar}
                className="absolute top-1/2 cursor-pointer top-[22px] right-[10px] text-white p-2 rounded sm:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
                  />
                </svg>
              </div>
            </div>

            {/* Main Content */}
            <div
              className={`transition-all duration-300 ${
                isSidebarOpen ? "w-[82%]" : "w-[95%]"
              } sm:w-[95%] relative sm:mx-auto h-full flex flex-col`}
            >
              {/* Header */}
              <div
                className={`h-[80px] border-l shadow-md fixed ${
                  isSidebarOpen ? "left-[18%]" : "left-[5%]"
                } sm:left-0 right-0 top-0 bg-white`}
              >
                <Header />
              </div>

              {/* Main Content Area */}
              <div
                style={{ height: "calc(100% - 110px)" }}
                className="bg-[#f1f8f6] w-full mt-[80px] pl-[10px] pr-[30px] sm:pr-[10px] scrollbar-hide overflow-y-auto"
              >
                <Outlet />
              </div>

              {/* Footer */}
              <div
                className={`h-[30px] shadow-md border-t border-l bg-white fixed bottom-0 right-0 ${
                  isSidebarOpen ? "left-[18%]" : "left-[5%]"
                } sm:left-0 z-50`}
              >
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
