import type { ChatHistory, ChatSettings } from "./types";

type ChatRequest = {
  userMessage: string;
  history: ChatHistory;
  settings: ChatSettings;
};

export function isValidChatRequest(body: unknown): body is ChatRequest {
  if (typeof body !== "object" || body === null) return false;

  const request = body as Record<string, unknown>;

  return (
    typeof request.userMessage === "string" &&
    Array.isArray(request.history) &&
    typeof request.settings === "object" &&
    request.settings !== null
  );
}
