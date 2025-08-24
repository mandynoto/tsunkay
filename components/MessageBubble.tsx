import EmptyMessageBubbleIndicator from "@/components/EmptyMessageBubbleIndicator";
import { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const textContent = message.parts.map((part) => part.text).join("");
  const hasContent = textContent.trim() !== "";

  if (!hasContent) {
    return isUser ? null : <EmptyMessageBubbleIndicator />;
  }

  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} my-8`}
    >
      <span
        className={`
        inline-block rounded-2xl px-4 py-4 shadow-sm break-words whitespace-pre-wrap
        ${isUser ? "bg-orange-100 text-black" : "bg-white text-gray-800"}
        max-w-full
      `}
      >
        {textContent}
      </span>
    </div>
  );
}
