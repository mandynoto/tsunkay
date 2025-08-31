"use client";

import { ChatHistory, Message } from "@/lib/types";
import { useCallback, useEffect, useRef } from "react";

const welcomeMessages = [
  "Hey let's play 'Guess what animal I am?' You get 10 hints",
  "HI, we're playing 'Guess what animal I am?' 10 hints and we're done",
  "Hello, let's play 'Guess what animal I am?' I give you 10 hints",
];

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

type HistorySetter = (
  updater: (prevHistory: ChatHistory) => ChatHistory
) => void;

interface UseWelcomeMessageOptions {
  initialMessageBubbleRenderDelay?: number;
  thinkingDelay?: number;
}

interface UseWelcomeMessageResult {
  stopTyping: () => void;
}

export function useWelcomeMessage(
  setHistory: HistorySetter,
  options?: UseWelcomeMessageOptions
): UseWelcomeMessageResult {
  const isTyping = useRef(true);
  const initialRenderDelay = options?.initialMessageBubbleRenderDelay ?? 0;
  const thinkingDelay = options?.thinkingDelay ?? 1100;

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

      await delay(thinkingDelay);

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
  }, [setHistory, stopTyping, initialRenderDelay, thinkingDelay]);

  return { stopTyping };
}
