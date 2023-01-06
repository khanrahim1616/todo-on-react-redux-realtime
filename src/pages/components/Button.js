import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const Buttons = ({ type, className, btnText, onClick, disabled ,placeholder}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      placeholder={placeholder}
    >
      {btnText}
    </button>
  );
};

export default Buttons;
