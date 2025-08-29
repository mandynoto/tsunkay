import CTAButton from "./CTAButton";
import { Github } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="w-full z-50 bg-[#fdfdfd] border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <div className="text-slate-600 text-s text-xl">Tsunkay</div>
      <CTAButton
        isFilled={false}
        href="https://github.com/mandynoto/tsunkay"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <Github size={16} />
        Source
      </CTAButton>
    </header>
  );
};

export default Header;
