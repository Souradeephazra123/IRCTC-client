import React, { useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import LoginComponent from "./LoginComponent";
const Header = ({onclick}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className=" flex justify-between">
        <img
          src="/public/irctc-logo.png"
          alt="irctc-logo"
          width={80}
          height={80}
          className=" w-[80px] h-[80px] p-10 object-cover object-center"
        />
        <FaAlignJustify
          size={40}
          color="#bbb"
          className=" border-2 border-[#bbb] p-2"
          onClick={onclick}
        />
      </div>
      
    </>
  );
};

export default Header;
