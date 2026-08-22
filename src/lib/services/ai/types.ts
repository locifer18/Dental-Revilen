import { BookingPayload, Treatment, Doctor, ClinicLocation, FAQ } from "@/types";

export type MessageSender = "user" | "ora" | "system";

export type MessageType =
  | "text"
  | "treatment_card"
  | "booking_flow"
  | "booking_summary"
  | "emergency_alert"
  | "whatsapp_handoff"
  | "quick_actions";

export interface AIChatMessage {
  id: string;
  sender: MessageSender;
  type?: MessageType;
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
  treatmentSlug?: string;
  bookingDraft?: Partial<BookingPayload>;
  confirmedBooking?: BookingPayload;
  whatsappPrefill?: string;
}

export interface SessionContext {
  activeTreatmentSlug?: string;
  activeLocationId?: string;
  activeDoctorSlug?: string;
  patientName?: string;
  patientPhone?: string;
  bookingIntentDetected?: boolean;
  isEmergency?: boolean;
  turnCount: number;
}

export interface AIProviderResponse {
  message: AIChatMessage;
  updatedContext: SessionContext;
}

export type ChatEventType =
  | "chat_opened"
  | "chat_closed"
  | "chat_started"
  | "suggestion_clicked"
  | "quick_action_clicked"
  | "treatment_question"
  | "pricing_inquiry"
  | "emergency_triggered"
  | "booking_started"
  | "booking_step_completed"
  | "booking_completed"
  | "whatsapp_clicked"
  | "conversation_reset"
  | "chat_error";

export interface ChatEvent {
  event: ChatEventType;
  timestamp: string;
  data?: Record<string, any>;
}

export interface AIProvider {
  name: string;
  generateResponse(
    messages: AIChatMessage[],
    context: SessionContext
  ): Promise<AIProviderResponse>;
}
