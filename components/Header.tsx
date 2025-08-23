import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdfdfd] shadow-md">
      <div className="container mx-auto relative z-10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-black text-xl font-bold">Tsunkay</div>
          <button className="btn-primary font-semibold cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
