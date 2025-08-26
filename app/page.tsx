"use client";

import { Message, MessageRole } from "@/lib/types";
import { useState } from "react";

import { ChatHistory } from "@/lib/types";
import ChatInput from "@/components/ChatInput";
import { ChatSettings } from "@/lib/types";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MessageWindow from "@/components/MessageWindow";
import { useWelcomeMessage } from "@/lib/hooks/useWelcomeMessage";

export default function Home() {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [settings] = useState<ChatSettings>({
    temperature: 1,
    model: "gemini-2.0-flash",
    systemInstructions: process.env.NEXT_PUBLIC_SYSTEM_PROMPT || "",
  });

  useWelcomeMessage(setHistory);

  async function handleSubmit(userMessage: string) {
    const newUserMessage: Message = {
      role: "user" as MessageRole,
      parts: [{ text: userMessage }],
    };

    let messageHistory: ChatHistory = []; // Initialize

    // Update client-side history with user message and AI placeholder
    setHistory((prevHistory) => {
      messageHistory = [...prevHistory, newUserMessage]; // This is the history to send to API
      return [...messageHistory, { role: "model", parts: [{ text: "" }] }]; // Add AI placeholder for display
    });

    try {
      const response = await fetch("/api/chat/sendMessageStreamed", {
        // Changed endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userMessage,
          history: messageHistory, // Send the actual history, not the one with placeholder
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

        // Update the placeholder message in history
        setHistory((prevHistory) => {
          const newHistory = [...prevHistory];
          const lastMessageIndex = newHistory.length - 1;
          if (newHistory[lastMessageIndex].role === "model") {
            // Ensure it's the AI placeholder
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
