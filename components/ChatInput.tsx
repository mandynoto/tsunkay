"use client";

import type { ChangeEvent, KeyboardEvent } from "react";

import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`mx-4 flex items-center rounded-full border border-black/5 bg-white p-3 shadow-sm`}
    >
      {/* Chat Input */}
      <div className="relative mx-2 flex flex-1 items-center">
        <textarea
          className="w-full resize-none border-none bg-transparent px-3 py-2 leading-tight focus:outline-none placeholder:text-gray-400 placeholder:font-medium"
          placeholder="Chat"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          rows={1}
        />
      </div>

      {/* Send Button */}
      <button
        className={
          message.trim()
            ? "btn-icon-primary cursor-pointer"
            : "btn-icon-disabled"
        }
        onClick={handleSend}
        disabled={!message.trim()}
        aria-label="Send message"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
