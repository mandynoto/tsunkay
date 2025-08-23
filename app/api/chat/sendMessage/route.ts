import { NextResponse } from "next/server";
import { chatToGemini } from "@/lib/utils/geminiHelper";
import { isValidChatRequest } from "@/lib/guards";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isValidChatRequest(body)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { userMessage, history, settings } = body;
    const aiResponse = await chatToGemini(userMessage, history, settings);
    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
