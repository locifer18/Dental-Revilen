import { AIChatMessage, SessionContext, AIProviderResponse } from "./types";

export interface AIProvider {
  name: string;
  generateResponse(
    messages: AIChatMessage[],
    context: SessionContext
  ): Promise<AIProviderResponse>;
}
