import React from "react";

const Button = ({ children }) => {
  return (
    <button className="bg-[#008C95] hover:scale-95 duration-100 text-white font-semibold py-2 px-4 rounded">
      {children}
    </button>
  );
};

export default Button;
