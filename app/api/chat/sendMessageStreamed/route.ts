import { NextResponse } from "next/server";
import { chatToGeminiStreamed } from "@/lib/utils/geminiHelper";
import { isValidChatRequest } from "@/lib/guards";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    if (!isValidChatRequest(body)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { userMessage, history, settings } = body;

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        const stream = await chatToGeminiStreamed(
          userMessage,
          history,
          settings
        );
        for await (const chunk of stream) {
          if (chunk.text) {
            controller.enqueue(encoder.encode(chunk.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
