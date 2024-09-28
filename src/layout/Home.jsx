import React from "react";
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div className="w-full mx-auto h-full">
      {/* Fixed Header and Navigation */}
      <div className="fixed top-0 w-full z-50">
        <div className="w-full bg-[#483426]">
          <div className="w-[85%] mx-auto">
            <Header />
          </div>
        </div>
        <div className="w-full shadow-lg bg-oldGod">
          <div className="w-[85%] mx-auto">
            <Navigation />
          </div>
        </div>
      </div>
      
      {/* Main Content - Add margin-top to push below fixed navbar */}
      <div className="w-full bg-[#F3F6F9] pb-[10px] pt-[10px] min-h-[90vh] mt-[150px]">
        <div className="w-[85%] mx-auto">
          <Outlet />
        </div>
      </div>
      
      {/* Footer */}
      <div className="w-full bg-[#443A2B] h-full">
        <div className="w-[85%] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
