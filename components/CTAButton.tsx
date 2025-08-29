import React from "react";

interface CTAButtonProps extends React.ComponentPropsWithoutRef<"a"> {
  isEnabled?: boolean;
  isFilled?: boolean;
  children: React.ReactNode;
}

export default function CTAButton({
  isEnabled = true,
  isFilled = true,
  children,
  className,
  ...props
}: CTAButtonProps) {
  let finalButtonClasses = "px-4 py-2 rounded-full border border-slate-200";

  if (isFilled) {
    finalButtonClasses += " " + "bg-slate-700 text-white";
  } else {
    finalButtonClasses += " " + "text-slate-600";
  }

  if (isEnabled) {
    finalButtonClasses += " cursor-pointer";
  } else {
    finalButtonClasses += " opacity-50";
  }

  finalButtonClasses += ` ${className || ""}`;

  return (
    <a
      aria-disabled={!isEnabled}
      className={finalButtonClasses.trim()}
      {...props}
    >
      {children}
    </a>
  );
}
