import React from "react";

const Button = ({ children, disabled, className = "", ...props }) => {
  return (
    <button 
      className={`bg-[#008C95] hover:scale-95 duration-100 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
