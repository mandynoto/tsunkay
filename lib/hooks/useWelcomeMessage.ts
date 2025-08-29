"use client";

import { ChatHistory, Message } from "@/lib/types";
import { useCallback, useEffect, useRef } from "react";

const welcomeMessages = ["Hey", "Hi", "Hello"];

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

type HistorySetter = (
  updater: (prevHistory: ChatHistory) => ChatHistory
) => void;

interface UseWelcomeMessageOptions {
  initialRenderDelay?: number;
}

interface UseWelcomeMessageResult {
  stopTyping: () => void;
}

export function useWelcomeMessage(
  setHistory: HistorySetter,
  options?: UseWelcomeMessageOptions
): UseWelcomeMessageResult {
  const isTyping = useRef(true);
  const initialRenderDelay = options?.initialRenderDelay ?? 0;

  const stopTyping = useCallback(() => {
    isTyping.current = false;
  }, []);

  useEffect(() => {
    async function typeWelcomeMessage() {
      await delay(initialRenderDelay);

      if (!isTyping.current) {
        return;
      }

      const welcomeMessageObject: Message = {
        role: "model",
        parts: [{ text: "" }],
      };

      setHistory(() => [welcomeMessageObject]);

      await delay(1100);

      if (!isTyping.current) {
        return;
      }

      const randomMessage =
        welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        if (newHistory.length > 0 && newHistory[0].role === "model") {
          newHistory[0] = {
            ...newHistory[0],
            parts: [{ text: randomMessage }],
          };
        }
        return newHistory;
      });

      isTyping.current = false;
    }

    typeWelcomeMessage();

    return () => {
      stopTyping();
    };
  }, [setHistory, stopTyping, initialRenderDelay]);

  return { stopTyping };
}
