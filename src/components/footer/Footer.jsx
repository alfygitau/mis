import React from "react";

const Footer = () => {
  return (
    <div className="h-[120px] text-white w-full flex flex-col gap-[10px] items-center justify-center">
      <div>
        <img className="h-[75px]" src="/mis.png" alt="logo" />
      </div>
      <p className="text-[16px] w-full text-center">
        Copyright &copy; MIS 2024
      </p>
    </div>
  );
};

export default Footer;
