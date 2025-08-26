"use client";

import { useEffect } from "react";
import { ChatHistory, Message } from "@/lib/types";

const welcomeMessages = ["Hey 🙂", "Wyd 🙂", "Sup 🙂"];

export function useWelcomeMessage(
  setHistory: (updater: (prevHistory: ChatHistory) => ChatHistory) => void
) {
  useEffect(
    function () {
      const welcomeMessageObject: Message = {
        role: "model",
        parts: [{ text: "" }],
      };
      setHistory(function () {
        return [welcomeMessageObject];
      });

      let typingTimer: NodeJS.Timeout;

      const initialDelayTimer = setTimeout(function () {
        const randomMessage =
          welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        let index = 0;

        function typeCharacter() {
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
            typingTimer = setTimeout(typeCharacter, 50);
          }
        }
        typeCharacter();
      }, 1100);

      return function () {
        clearTimeout(initialDelayTimer);
        if (typingTimer) {
          clearTimeout(typingTimer);
        }
      };
    },
    [setHistory]
  );
}
