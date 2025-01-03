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
            <div
              className={`transition-all relative duration-300 ${
                isSidebarOpen ? "w-[15%]" : "w-[5%]"
              } bg-[#fff] h-full sm:hidden`}
            >
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </div>
            <div
              className={`transition-all duration-300 ${
                isSidebarOpen ? "w-[85%]" : "w-[95%]"
              } sm:w-[95%] relative sm:mx-auto h-full flex flex-col`}
            >
              <div
                className={`h-[60px] border-l shadow-md fixed ${
                  isSidebarOpen ? "left-[15%]" : "left-[5%]"
                } sm:left-0 right-0 top-0 bg-white`}
              >
                <Header />
              </div>
              <div
                style={{ height: "calc(100% - 110px)" }}
                className="bg-[#f1f8f6] w-full mt-[60px] pl-[10px] pr-[30px] sm:pr-[10px] overflow-y-auto"
              >
                <Outlet />
              </div>
              <div
                className={`h-[30px] shadow-md border-t border-l bg-white fixed bottom-0 right-0 ${
                  isSidebarOpen ? "left-[15%]" : "left-[5%]"
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
