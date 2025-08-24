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
      <div className="bg-white rounded-2xl px-3 py-4 shadow-sm">
        <div className="flex items-center">
          <span className="dot-animation">.</span>
          <span className="dot-animation" style={{ "--delay": "0.3s" }}>
            .
          </span>
          <span className="dot-animation" style={{ "--delay": "0.6s" }}>
            .
          </span>
        </div>
        <style jsx global>{`
          @keyframes bold-dot {
            0%,
            100% {
              font-weight: normal;
            }
            50% {
              font-weight: bold;
            }
          }
          .dot-animation {
            display: inline-block;
            animation: bold-dot 1.5s infinite var(--delay, 0s) ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
}
