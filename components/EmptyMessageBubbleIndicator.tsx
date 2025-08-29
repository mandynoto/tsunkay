"use client";

// Add type declaration for CSS custom properties
declare module "react" {
  interface CSSProperties {
    "--delay"?: string;
  }
}

export default function EmptyMessageBubbleIndicator() {
  return (
    <div className="w-full flex justify-start my-8">
      <div className="bg-white rounded-2xl px-3 py-4 ">
        <div className="flex items-center">
          <span className="text-2xl">🤔</span>
        </div>
      </div>
    </div>
  );
}
