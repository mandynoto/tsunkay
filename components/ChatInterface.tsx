"use client";

import type { ChatHistory, ChatSettings } from "@/lib/types";
import { Message, MessageRole } from "@/lib/types";

import ChatInput from "@/components/ChatInput";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MessageWindow from "@/components/MessageWindow";
import { systemPrompt } from "@/lib/systemPrompt";
import { useState } from "react";

interface ChatInterfaceProps {
  welcomeMessage: string;
}

export default function ChatInterface({ welcomeMessage }: ChatInterfaceProps) {
  const [history, setHistory] = useState<ChatHistory>([
    { role: "model", parts: [{ text: welcomeMessage }] },
  ]);
  const [settings] = useState<ChatSettings>({
    temperature: 1,
    model: process.env.NEXT_PUBLIC_MODEL || "gemini-2.0-flash-lite",
    systemInstructions: systemPrompt,
  });

  async function handleSubmit(userMessage: string) {
    const newUserMessage: Message = {
      role: "user" as MessageRole,
      parts: [{ text: userMessage }],
    };

    let messageHistory: ChatHistory = [];

    setHistory((prevHistory) => {
      messageHistory = [...prevHistory, newUserMessage];
      return [...messageHistory, { role: "model", parts: [{ text: "" }] }];
    });

    try {
      const response = await fetch("/api/chat/sendMessageStreamed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userMessage,
          history: messageHistory,
          settings: settings,
        }),
      });

      if (!response.body) {
        console.error("Response body is null");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedResponse = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;

        setHistory((prevHistory) => {
          const newHistory = [...prevHistory];
          const lastMessageIndex = newHistory.length - 1;
          if (newHistory[lastMessageIndex].role === "model") {
            newHistory[lastMessageIndex] = {
              ...newHistory[lastMessageIndex],
              parts: [{ text: accumulatedResponse }],
            };
          }
          return newHistory;
        });
      }
    } catch (error) {
      console.error("Request Failed:", error);
    }
  }

  return (
    <div className="h-screen">
      <main className="h-full flex flex-col">
        <Header />
        <MessageWindow history={history} />
        <div className="max-w-2xl mx-auto w-full">
          <ChatInput onSend={handleSubmit} />
        </div>
        <Footer />
      </main>
    </div>
  );
}
