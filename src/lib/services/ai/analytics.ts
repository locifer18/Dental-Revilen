import { ChatEventType, ChatEvent } from "./types";

export function trackChatEvent(event: ChatEventType, data?: Record<string, any>): void {
  const eventPayload: ChatEvent = {
    event,
    timestamp: new Date().toISOString(),
    data,
  };

  // Safe client-side analytics buffer for demo and inspection
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(sessionStorage.getItem("ora_chat_events") || "[]");
      existing.push(eventPayload);
      sessionStorage.setItem("ora_chat_events", JSON.stringify(existing.slice(-50)));
      console.log(`[ORA Chat Telemetry] ${event}`, data || "");
    } catch (e) {
      // Ignore storage errors in restricted contexts
    }
  }
}
