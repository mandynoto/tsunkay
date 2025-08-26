import React from "react";

interface CTAButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  isEnabled?: boolean;
  children: React.ReactNode;
}

export default function CTAButton({
  isEnabled = true,
  children,
  className,
  ...props
}: CTAButtonProps) {
  const buttonClasses = isEnabled
    ? "bg-slate-700 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"
    : "bg-slate-700 text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed";

  const finalClasses = `${buttonClasses} ${className || ""}`.trim();

  return (
    <button disabled={!isEnabled} className={finalClasses} {...props}>
      {children}
    </button>
  );
}
