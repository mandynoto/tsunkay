"use client";

import { ChatHistory, Message } from "@/lib/types";
import { useCallback, useEffect, useRef } from "react";

const welcomeMessages = ["Hey", "Hi", "Hello"];

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

type SetHistoryFunction = (
  updater: (prevHistory: ChatHistory) => ChatHistory
) => void;

interface WelcomeMessageOptions {
  initialRenderDelay?: number;
}

interface UseWelcomeMessageReturn {
  stopTyping: () => void;
}

export function useWelcomeMessage(
  setHistory: SetHistoryFunction,
  options?: WelcomeMessageOptions
): UseWelcomeMessageReturn {
  const isTyping = useRef(true);
  const initialRenderDelay = options?.initialRenderDelay ?? 0;

  const stopTyping = useCallback(() => {
    isTyping.current = false;
  }, []);

  useEffect(
    function () {
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
        let currentText = "";

        for (let i = 0; i < randomMessage.length; i++) {
          if (!isTyping.current) {
            return;
          }

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

        isTyping.current = false;
      }

      typeWelcomeMessage();

      return () => {
        stopTyping();
      };
    },
    [setHistory, stopTyping, initialRenderDelay]
  );

  return { stopTyping };
}
