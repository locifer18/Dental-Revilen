import { AIProvider } from "./types";
import { MockAIProvider } from "./mockProvider";
import { ExternalLLMProvider } from "./openaiProvider";

export * from "./types";
export * from "./analytics";
export * from "./knowledgeBase";

let activeProvider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (activeProvider) return activeProvider;

  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
  const model = process.env.AI_MODEL || "gemini-1.5-flash";
  const baseUrl = process.env.AI_BASE_URL;

  if (apiKey) {
    activeProvider = new ExternalLLMProvider(apiKey, model, baseUrl);
  } else {
    activeProvider = new MockAIProvider();
  }

  return activeProvider;
}

export const initialReceptionistMessage = {
  id: "msg-welcome",
  sender: "ora" as const,
  type: "quick_actions" as const,
  text: `Hi, I'm Revilen 👋\n\nI can help you with:\n• Finding the right treatment\n• Understanding dental procedures\n• Preparing for your appointment\n• Clinic information\n• Booking a consultation\n\n*Please note: I provide general dental guidance and cannot replace a medical diagnosis.*`,
  timestamp: "Just now",
  suggestions: [
    "What is the cost of dental implants?",
    "Is root canal treatment painful?",
    "Do you offer Invisalign?",
    "What should I bring to my first visit?",
    "Where is the clinic?",
  ],
};
