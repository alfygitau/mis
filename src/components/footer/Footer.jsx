import React from "react";

const Footer = () => {
  return (
    <div className="h-[120px] text-white w-full flex flex-col gap-[10px] items-center justify-center">
      <div>
        {/* <img className="h-[75px]" src="/mis.png" alt="logo" /> */}
        <p className="text-center">FARM TO MARKET ALLIANCE</p>
        <p className="text-center">Making markets work better for farmers</p>
      </div>
      <p className="text-[16px] w-full text-center text-[#00ff]">
        Copyright &copy; MIS 2024
      </p>
    </div>
  );
};

export default Footer;
