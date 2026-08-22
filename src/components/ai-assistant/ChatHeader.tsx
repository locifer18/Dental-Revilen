"use client";

import React, { useState } from "react";
import { Sparkles, RotateCcw, X, Maximize2, Minimize2, Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export interface ChatHeaderProps {
  onClose: () => void;
  onReset: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function ChatHeader({
  onClose,
  onReset,
  isExpanded = false,
  onToggleExpand,
}: ChatHeaderProps) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleConfirm = () => {
    setShowConfirmReset(false);
    onReset();
  };

  return (
    <>
      <div className="p-4 bg-pine-900 text-ivory-50 flex items-center justify-between border-b border-pine-800 shrink-0">
        {/* Brand & Online State */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-pine-800 text-gold-300 flex items-center justify-center border border-gold-500/25 shadow-sm relative font-serif font-bold text-lg">
            R
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-pine-900" title="Online Receptionist" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-base font-semibold text-ivory-50 tracking-tight">
                Revilen
              </h3>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 font-sans uppercase tracking-wider font-semibold border border-gold-500/30">
                Dental Assistant
              </span>
            </div>
            <p className="text-[11px] text-ivory-300 font-light flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available now • Responds instantly</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowConfirmReset(true)}
            className="p-2 text-ivory-300 hover:text-white rounded-full hover:bg-pine-800 transition-colors"
            title="Start new conversation"
            aria-label="New conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="p-2 text-ivory-300 hover:text-white rounded-full hover:bg-pine-800 transition-colors hidden sm:inline-flex"
              title={isExpanded ? "Standard view" : "Expand view"}
              aria-label="Toggle size"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 text-ivory-300 hover:text-white rounded-full hover:bg-pine-800 transition-colors"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Resetting Conversation */}
      <Modal
        isOpen={showConfirmReset}
        onClose={() => setShowConfirmReset(false)}
        title="Start a New Conversation?"
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs sm:text-sm text-stone-600">
          <p>
            Starting a new conversation will clear your current chat history and any in-progress appointment drafts.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowConfirmReset(false)}
              className="px-4 py-2 rounded-full border border-stone-200 text-charcoal-700 hover:bg-stone-100 font-medium text-xs"
            >
              Cancel
            </button>
            <Button
              type="button"
              onClick={handleConfirm}
              variant="primary"
              size="sm"
            >
              Start New Chat
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
