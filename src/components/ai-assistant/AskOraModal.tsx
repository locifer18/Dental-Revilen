"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Loader2, ShieldAlert, X } from "lucide-react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { PromptSuggestions } from "./PromptSuggestions";
import { AIChatMessage, SessionContext } from "@/lib/services/ai/types";
import { initialReceptionistMessage } from "@/lib/services/ai";
import { trackChatEvent } from "@/lib/services/ai/analytics";
import { clinicConfig } from "@/data/clinicConfig";
import { cn } from "@/lib/utils";

export function AskOraModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const [messages, setMessages] = useState<AIChatMessage[]>([initialReceptionistMessage]);
  const [context, setContext] = useState<SessionContext>({ turnCount: 0 });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load session from sessionStorage on mount
  useEffect(() => {
    try {
      const storedMessages = sessionStorage.getItem("revilen_chat_messages");
      const storedContext = sessionStorage.getItem("revilen_chat_context");
      const storedHasSeen = localStorage.getItem("revilen_has_opened_chat");

      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
      if (storedContext) {
        setContext(JSON.parse(storedContext));
      }
      if (storedHasSeen) {
        setHasUnreadNotification(false);
      }
    } catch (e) {
      console.warn("Could not load stored chat session", e);
    }
  }, []);

  // Save session to sessionStorage on update
  useEffect(() => {
    try {
      if (messages.length > 1) {
        sessionStorage.setItem("revilen_chat_messages", JSON.stringify(messages));
      }
      sessionStorage.setItem("revilen_chat_context", JSON.stringify(context));
    } catch (e) {
      console.warn("Could not persist chat session", e);
    }
  }, [messages, context]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping, scrollToBottom]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasUnreadNotification(false);
    try {
      localStorage.setItem("revilen_has_opened_chat", "true");
    } catch (e) {}
    trackChatEvent("chat_opened");
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    trackChatEvent("chat_closed");
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isTyping) return;

    const userMessage: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    if (!textToSend) setInput("");
    setIsTyping(true);

    trackChatEvent("treatment_question", { query: messageText });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          context,
        }),
      });

      if (!res.ok) throw new Error("Chat request failed");
      const data = await res.json();

      setMessages((prev) => [...prev, data.response]);
      if (data.updatedContext) {
        setContext(data.updatedContext);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: "ora",
          text: `I'm having a momentary connection glitch. Please feel free to call our direct clinic concierge at [${clinicConfig.emergencyPhone}](tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}) or message us on WhatsApp.`,
          timestamp: "Just now",
        },
      ]);
      trackChatEvent("chat_error", { error: String(err) });
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetConversation = () => {
    setMessages([initialReceptionistMessage]);
    setContext({ turnCount: 0 });
    setInput("");
    try {
      sessionStorage.removeItem("revilen_chat_messages");
      sessionStorage.removeItem("revilen_chat_context");
    } catch (e) {}
    trackChatEvent("conversation_reset");
  };

  return (
    <>
      {/* Floating Receptionist Launcher */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleOpenChat}
          className="relative group flex items-center gap-2.5 px-4 sm:px-5 py-3.5 rounded-full bg-pine-900 text-ivory-50 shadow-float border border-gold-500/30 hover:bg-pine-800 transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-pine-500/50"
          aria-label="Open Revilen AI Dental Receptionist"
        >
          <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 flex items-center justify-center font-serif font-bold text-xs">
            R
          </div>

          <div className="text-left hidden sm:block">
            <span className="font-serif text-sm tracking-wide font-medium block leading-none">
              Ask Revilen
            </span>
            <span className="text-[9px] uppercase tracking-widest text-gold-300 font-sans block mt-0.5">
              Receptionist
            </span>
          </div>

          {/* Unread Ping Dot */}
          {hasUnreadNotification && (
            <>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold-400 rounded-full border-2 border-white animate-ping" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold-400 rounded-full border-2 border-white" />
            </>
          )}
        </button>
      </div>

      {/* Interactive AI Receptionist Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 pointer-events-none">
            {/* Backdrop on Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseChat}
              className="fixed inset-0 bg-charcoal-950/40 backdrop-blur-xs pointer-events-auto sm:hidden"
            />

            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "pointer-events-auto w-full max-h-[92vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-float border border-stone-200/90 flex flex-col overflow-hidden z-10 transition-all duration-300",
                isExpanded
                  ? "sm:w-[560px] h-[90vh]"
                  : "sm:w-[420px] lg:w-[440px] h-[85vh] sm:h-[620px]"
              )}
            >
              {/* Header */}
              <ChatHeader
                onClose={handleCloseChat}
                onReset={handleResetConversation}
                isExpanded={isExpanded}
                onToggleExpand={() => setIsExpanded(!isExpanded)}
              />

              {/* Medical Notice Strip */}
              <div className="bg-gold-50/90 border-b border-gold-200/80 px-3.5 py-1.5 text-[11px] text-charcoal-800 flex items-center justify-between shrink-0 font-light">
                <div className="flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-gold-700 shrink-0" />
                  <span>General advice only • In emergency call</span>
                </div>
                <a
                  href={`tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`}
                  className="font-semibold text-pine-900 underline"
                >
                  {clinicConfig.emergencyPhone}
                </a>
              </div>

              {/* Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-1 bg-stone-50/40">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    onSelectSuggestion={(s) => {
                      trackChatEvent("suggestion_clicked", { suggestion: s });
                      handleSendMessage(s);
                    }}
                    onSelectQuickAction={(q) => {
                      trackChatEvent("quick_action_clicked", { action: q });
                      handleSendMessage(q);
                    }}
                  />
                ))}

                {/* Soundless Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2.5 mb-4 self-start max-w-[80%]">
                    <div className="w-7 h-7 rounded-full bg-pine-900 text-gold-300 flex items-center justify-center shrink-0 font-serif font-bold text-xs">
                      R
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-xs bg-stone-100 border border-stone-200/60 flex items-center gap-1.5 text-xs text-stone-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Dynamic Suggested Prompts Bar */}
              {messages.length <= 2 && (
                <PromptSuggestions
                  onSelect={(p) => {
                    trackChatEvent("suggestion_clicked", { prompt: p });
                    handleSendMessage(p);
                  }}
                />
              )}

              {/* Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 border-t border-stone-200 bg-white flex items-center gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Revilen about treatments, prices, or appointments..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-stone-100 border border-stone-200 text-xs sm:text-sm text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 rounded-full bg-pine-900 text-ivory-50 hover:bg-pine-800 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-xs shrink-0"
                  aria-label="Send query to Revilen"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
