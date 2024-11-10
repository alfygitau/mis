import React from "react";

const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 4.95 10"
      width="32"
      height="32"
    >
      <defs>
        <style>{`.cls-1 { fill: #fff; } .cls-2 { fill: #444; }`}</style>
      </defs>
      <rect className="cls-1" width="4.95" height="10" />
      <polygon
        className="cls-2"
        points="1.41 4.67 2.48 3.18 3.54 4.67 1.41 4.67"
      />
      <polygon
        className="cls-2"
        points="3.54 5.33 2.48 6.82 1.41 5.33 3.54 5.33"
      />
    </svg>
  );
};

export default Arrow;
