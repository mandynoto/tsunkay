"use client";

import { useEffect, useRef } from "react";

import { ChatHistory } from "@/lib/types";
import MessageBubble from "./MessageBubble";

interface MessageWindowProps {
  history: ChatHistory;
}

export default function MessageWindow({ history }: MessageWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="flex-1 overflow-y-auto p-8 pt-16 h-0">
      <div className="mx-auto max-w-xl">
        {history.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
