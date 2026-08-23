import { NextRequest, NextResponse } from "next/server";
import { getAIProvider, AIChatMessage, SessionContext } from "@/lib/services/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, context, message } = body;

    let messageList: AIChatMessage[] = messages || [];
    if (!messageList.length && message) {
      messageList = [
        {
          id: `user-${Date.now()}`,
          sender: "user",
          text: message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ];
    }

    if (!messageList.length) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const currentContext: SessionContext = context || { turnCount: 0 };
    const provider = getAIProvider();
    const result = await provider.generateResponse(messageList, currentContext);

    return NextResponse.json({
      response: result.message,
      updatedContext: result.updatedContext,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "We encountered an issue processing your query. Please call our clinic concierge at +91 626 884 4871.",
      },
      { status: 500 }
    );
  }
}
