import { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-8`}>
      <div
        className={`rounded-2xl px-4 py-4 shadow-sm ${
          isUser ? "bg-orange-100 text-black" : "bg-white text-gray-800"
        } max-w-xs sm:max-w-md`}
      >
        <div className="break-words whitespace-pre-wrap">
          {message.parts.map((part, idx) => (
            <span key={idx}>{part.text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
