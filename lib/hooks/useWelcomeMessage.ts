"use client";

import { ChatHistory, Message } from "@/lib/types";
import { useCallback, useEffect, useRef } from "react";

const welcomeMessages = ["Hey 🙂", "Hi 🙂", "Hello 🙂"];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useWelcomeMessage(
  setHistory: (updater: (prevHistory: ChatHistory) => ChatHistory) => void,
  options?: { initialRenderDelay?: number }
): { stopTyping: () => void } {
  const isTypingActive = useRef(true);
  const initialRenderDelay = options?.initialRenderDelay ?? 0;

  const stopTyping = useCallback(function () {
    isTypingActive.current = false;
  }, []);

  useEffect(
    function () {
      isTypingActive.current = true;

      const typeWelcomeMessage = async () => {
        await delay(initialRenderDelay);
        if (!isTypingActive.current) return;

        const welcomeMessageObject: Message = {
          role: "model",
          parts: [{ text: "" }],
        };
        setHistory(() => [welcomeMessageObject]);

        await delay(1100);
        if (!isTypingActive.current) return;

        const randomMessage =
          welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        let currentText = "";

        for (let i = 0; i < randomMessage.length; i++) {
          if (!isTypingActive.current) return;

          let charToAdd = randomMessage.charAt(i);
          if (
            charToAdd.charCodeAt(0) >= 0xd800 &&
            charToAdd.charCodeAt(0) <= 0xdbff &&
            i + 1 < randomMessage.length
          ) {
            const nextChar = randomMessage.charAt(i + 1);
            if (
              nextChar.charCodeAt(0) >= 0xdc00 &&
              nextChar.charCodeAt(0) <= 0xdfff
            ) {
              charToAdd += nextChar;
              i++;
            }
          }

          currentText += charToAdd;
          setHistory((prevHistory) => {
            const newHistory = [...prevHistory];
            if (newHistory.length > 0 && newHistory[0].role === "model") {
              newHistory[0] = {
                ...newHistory[0],
                parts: [{ text: currentText }],
              };
            }
            return newHistory;
          });

          await delay(150);
        }
        isTypingActive.current = false;
      };

      typeWelcomeMessage();

      return () => {
        stopTyping();
      };
    },
    [setHistory, stopTyping, initialRenderDelay]
  );

  return { stopTyping };
}
