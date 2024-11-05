import React from "react";
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <div className="w-[100vw] bg-[#fcb040] h-[100vh]">
        <div className="w-[100%] mx-auto h-full">
          <div className="flex items-center h-full w-full">
            <div className="w-[20%] bg-[#fcb040] sm:hidden h-full">
              <Sidebar />
            </div>
            <div className="w-[80%] sm:w-[95%] relative sm:mx-auto h-full flex flex-col">
              <div className="h-[80px] border-l fixed left-[20%] right-[20px] top-0 bg-white">
                <Header />
              </div>
              <div
                style={{ height: "calc(100% - 140px)" }}
                className="bg-[#DFEFF6] w-full mt-[80px] pl-[10px] pr-[30px] scrollbar-hide overflow-y-auto"
              >
                <Outlet />
              </div>
              <div className="h-[60px] bg-white fixed bottom-0 right-0 left-[20%] z-50">
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
