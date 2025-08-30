import { ChatHistory, ChatSettings } from "@/lib/types";

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not defined");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function chatToGemini(
  userMessage: string,
  history: ChatHistory,
  settings: ChatSettings
): Promise<string> {
  const chatSession = ai.chats.create({
    model: settings.model || "gemini-2.0-flash",
    config: {
      temperature: settings.temperature || 0.7,
      topP: 0.9,
      responseMimeType: "text/plain",
      systemInstruction: {
        parts: [
          {
            text: settings.systemInstructions || "You are a helpful assistant.",
          },
        ],
        role: "system",
      },
    },
    history: history,
  });

  try {
    const result = await chatSession.sendMessage({ message: userMessage });
    return result.text || "";
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function chatToGeminiStreamed(
  userMessage: string,
  history: ChatHistory,
  settings: ChatSettings
): Promise<AsyncGenerator<GenerateContentResponse, unknown, unknown>> {
  const chatSession = ai.chats.create({
    model: settings.model || "gemini-2.0-flash",
    config: {
      temperature: settings.temperature || 0.7,
      topP: 0.9,
      responseMimeType: "text/plain",
      systemInstruction: {
        parts: [
          {
            text: settings.systemInstructions || "You are a helpful assistant.",
          },
        ],
        role: "system",
      },
    },
    history: history,
  });

  try {
    const result = await chatSession.sendMessageStream({ message: userMessage });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
