import React from "react";
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div className="w-[100%] mx-auto h-full">
      <div className="w-full border-b bg-[#fff]">
        <div className="w-[85%] mx-auto">
          <Header />
        </div>
      </div>
      <div className="w-full shadow-lg bg-oldGod">
        <div className="w-[85%] mx-auto">
          <Navigation />
        </div>
      </div>
      <div className="w-full bg-[#F3F6F9] py-[20px] min-h-[90vh]">
        <div className="w-[85%] mx-auto">
          <Outlet />
        </div>
      </div>
      <div className="w-full bg-oldGod h-full">
        <div className="w-[85%] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
