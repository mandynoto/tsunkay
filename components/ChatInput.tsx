"use client";

import { type ChangeEvent, type KeyboardEvent, useRef, useEffect } from "react";

import { VscArrowSmallUp } from "react-icons/vsc";
import ChatButton from "./ChatButton";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && e.shiftKey) {
        e.preventDefault();
        textAreaRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      className={`mx-4 flex items-center rounded-full border border-slate-200 bg-white p-3`}
    >
      {/* Chat Input */}
      <div className="relative mx-2 flex flex-1 items-center">
        <textarea
          ref={textAreaRef}
          autoFocus
          className="w-full resize-none border-none bg-transparent px-3 py-2 leading-tight focus:outline-none placeholder:text-gray-400 placeholder:font-medium"
          placeholder="Chat"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          rows={1}
        />
      </div>

      {/* Send Button */}
      <ChatButton
        onClick={handleSend}
        isEnabled={!!message.trim()}
        aria-label="Send message"
      >
        <VscArrowSmallUp size={20} />
      </ChatButton>
    </div>
  );
}
