import React from "react";

interface ChatButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  isEnabled?: boolean;
  children: React.ReactNode; // For the icon
}

export default function ChatButton({
  isEnabled = true,
  children,
  className,
  ...props
}: ChatButtonProps) {
  const buttonClasses = isEnabled
    ? "bg-slate-700 text-white p-2 rounded-full cursor-pointer"
    : "bg-slate-100 text-slate-400 p-2 rounded-full";

  const finalClasses = `${buttonClasses} ${className || ""}`.trim();

  return (
    <button
      disabled={!isEnabled}
      className={finalClasses}
      {...props} // Pass through onClick, aria-label, etc.
    >
      {children}
    </button>
  );
}
