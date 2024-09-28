import React from "react";

const Footer = () => {
  return (
    <div className="h-[320px] text-white w-full flex flex-col gap-[10px] items-center justify-center">
      <div>
        {/* <img className="h-[75px]" src="/mis.png" alt="logo" /> */}
        <p className="text-center">FARM TO MARKET ALLIANCE</p>
        <p className="text-center">Making markets work better for farmers</p>
      </div>
      <p className="text-[16px] w-full text-center text-oldGod">
        Copyright &copy; MIS 2024
      </p>
      <div className="border-b border-[1px] w-full"></div>
      <p className="text-oldGod">Our Partners</p>
      <div className="flex items-center justify-center gap-[40px]">
        <img className="h-[80px]" src="/ftma_logo.png" alt="logo" />
        <img className="h-[80px]" src="/cga.png" alt="logo" />
        <img className="h-[80px]" src="/lliffton-Logo.png" alt="logo" />
      </div>
    </div>
  );
};

export default Footer;
