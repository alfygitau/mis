import React from "react";
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <div className="w-[100vw] bg-white h-[100vh]">
        <div className="w-[95%] mx-auto h-full">
          <div className="flex items-center h-full w-full">
            <div className="w-[15%] sm:hidden h-full">
              <Sidebar />
            </div>
            <div className="w-[85%] border sm:w-[95%] relative sm:mx-auto h-full flex flex-col">
              <div className="h-[60px] fixed bg-white left-[17%] right-[2.6%] top-0 bg-white">
                <Header />
              </div>
              <div
                style={{ height: "calc(100% - 120px)" }}
                className="bg-[#DFEFF6] w-full mt-[60px] px-[10px] scrollbar-hide overflow-y-auto"
              >
                <Outlet />
              </div>
              <div className="h-[60px] border-t fixed bottom-0 right-[2.5%] left-[17%] z-50">
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
