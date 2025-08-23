"use client";

import { Message, MessageRole } from "@/lib/types";

import { ChatHistory } from "@/lib/types";
import ChatInput from "@/components/ChatInput";
import { ChatSettings } from "@/lib/types";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MessageWindow from "@/components/MessageWindow";
import { useState } from "react";

export default function Home() {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [settings] = useState<ChatSettings>({
    temperature: 1,
    model: "gemini-2.0-flash",
    systemInstructions: "you are a helpful assistant",
  });

  async function handleSubmit(userMessage: string) {
    const newUserMessage: Message = {
      role: "user" as MessageRole,
      parts: [{ text: userMessage }],
    };

    const updatedHistory = [...history, newUserMessage];
    setHistory(updatedHistory);

    try {
      const response = await fetch("/api/chat/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userMessage,
          history: updatedHistory,
          settings: settings,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("AI Error:", data.error);
        return;
      }

      const aiMessage: Message = {
        role: "model" as MessageRole,
        parts: [{ text: data.response }],
      };

      setHistory([...updatedHistory, aiMessage]);
    } catch (error) {
      console.error("Request Failed:", error);
    }

    console.log(userMessage);
  }

  return (
    <div className="h-screen">
      <Header />
      <main className="h-full flex flex-col">
        <MessageWindow history={history} />
        <div className="max-w-2xl mx-auto w-full">
          <ChatInput onSend={handleSubmit} />
        </div>
        <Footer />
      </main>
    </div>
  );
}
