import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fdfdfd] shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-black text-xl font-bold">Tsunkay</div>
      <button className="btn-primary font-semibold cursor-pointer">
        Sign Up
      </button>
    </header>
  );
};

export default Header;
