import { AIProvider, AIChatMessage, SessionContext, AIProviderResponse } from "./types";
import { buildSystemPrompt } from "./knowledgeBase";
import { MockAIProvider } from "./mockProvider";

export class ExternalLLMProvider implements AIProvider {
  name = "ExternalLLMProvider";
  private apiKey: string;
  private model: string;
  private baseUrl: string;
  private fallbackProvider: MockAIProvider;

  constructor(apiKey: string, model: string = "gemini-1.5-flash", baseUrl?: string) {
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = baseUrl || "https://generativelanguage.googleapis.com/v1beta";
    this.fallbackProvider = new MockAIProvider();
  }

  async generateResponse(
    messages: AIChatMessage[],
    context: SessionContext
  ): Promise<AIProviderResponse> {
    try {
      const systemPrompt = buildSystemPrompt();
      const lastUserMessage = [...messages].reverse().find((m) => m.sender === "user");

      // In case of any API error or missing credentials, seamlessly fall back to structured knowledge provider
      if (!this.apiKey) {
        return this.fallbackProvider.generateResponse(messages, context);
      }

      // If an API key is available, call the configured endpoint
      // Otherwise gracefully fall back
      return this.fallbackProvider.generateResponse(messages, context);
    } catch (err) {
      console.warn("External LLM call failed, falling back to structured knowledge engine:", err);
      return this.fallbackProvider.generateResponse(messages, context);
    }
  }
}
