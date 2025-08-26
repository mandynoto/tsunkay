"use client";

import { ChatHistory, Message } from "@/lib/types";
import { useCallback, useEffect, useRef } from "react";

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
          if (!isTypingActive.current) {
            return;
          }

          if (index < randomMessage.length) {
            let charToAdd = randomMessage.charAt(index);
            let nextIndex = index + 1;

            // fix emoji being temporarily rendered as question mark before being replaced as an actual emoji
            // Check if it's the start of a surrogate pair (high surrogate)
            // and if the next character is a low surrogate.
            // This indicates a single Unicode code point (like many emojis)
            // that takes two UTF-16 code units.
            if (
              charToAdd.charCodeAt(0) >= 0xd800 &&
              charToAdd.charCodeAt(0) <= 0xdbff && // is high surrogate
              nextIndex < randomMessage.length &&
              randomMessage.charCodeAt(nextIndex) >= 0xdc00 &&
              randomMessage.charCodeAt(nextIndex) <= 0xdfff // is low surrogate
            ) {
              charToAdd += randomMessage.charAt(nextIndex); // Add the low surrogate
              nextIndex++; // Move past both parts of the emoji
            }

            setHistory(function (prevHistory) {
              const newHistory = [...prevHistory];
              if (newHistory.length > 0 && newHistory[0].role === "model") {
                newHistory[0] = {
                  ...newHistory[0],
                  parts: [{ text: newHistory[0].parts[0].text + charToAdd }],
                };
              }
              return newHistory;
            });
            index = nextIndex; // Update index to skip the second part of the emoji if it was a surrogate pair
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
