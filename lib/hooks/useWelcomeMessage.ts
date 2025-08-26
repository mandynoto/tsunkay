"use client";

import { useEffect, useRef, useCallback } from "react";
import { ChatHistory, Message } from "@/lib/types";

const welcomeMessages = ["Hey 🙂", "Wyd 🙂", "Sup 🙂"];

export function useWelcomeMessage(
  setHistory: (updater: (prevHistory: ChatHistory) => ChatHistory) => void
): { stopTyping: () => void } {
  const typingTimers = useRef<NodeJS.Timeout[]>([]);
  const isTypingActive = useRef(true); // New flag

  const stopTyping = useCallback(function () {
    isTypingActive.current = false; // Set flag to false
    typingTimers.current.forEach(clearTimeout);
    typingTimers.current = [];
  }, []);

  useEffect(
    function () {
      isTypingActive.current = true; // Reset flag on mount

      const welcomeMessageObject: Message = {
        role: "model",
        parts: [{ text: "" }],
      };
      setHistory(function () {
        return [welcomeMessageObject];
      });

      const initialDelayTimer = setTimeout(function () {
        const randomMessage =
          welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        let index = 0;

        function typeCharacter() {
          if (!isTypingActive.current) { // Check flag before continuing
            return;
          }

          if (index < randomMessage.length) {
            setHistory(function (prevHistory) {
              const newHistory = [...prevHistory];
              if (newHistory.length > 0 && newHistory[0].role === "model") {
                newHistory[0] = {
                  ...newHistory[0],
                  parts: [{ text: randomMessage.substring(0, index + 1) }],
                };
              }
              return newHistory;
            });
            index++;
            const typingTimer = setTimeout(typeCharacter, 50);
            typingTimers.current.push(typingTimer);
          } else {
            isTypingActive.current = false; // Typing finished naturally
          }
        }
        typeCharacter();
      }, 1100);

      typingTimers.current.push(initialDelayTimer);

      return function () {
        stopTyping(); // Cleanup calls stopTyping
      };
    },
    [setHistory, stopTyping]
  );

  return { stopTyping };
}
