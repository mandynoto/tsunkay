import CTAButton from "./CTAButton";
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fdfdfd] shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-black text-xl font-bold">Tsunkay</div>
      <CTAButton>Sign Up</CTAButton>
    </header>
  );
};

export default Header;
