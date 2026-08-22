import React from "react";
import { Sparkles } from "lucide-react";

export interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void;
}

const defaultPrompts = [
  "What is the cost of Dental Implants?",
  "How does Invisalign clear aligners work?",
  "Are your root canal treatments painless?",
  "Do you have 0% Interest EMI options?",
  "What happens at the first 3D scan visit?",
];

export function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  return (
    <div className="p-3 bg-stone-50 border-t border-stone-200">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
        <Sparkles className="w-3 h-3 text-gold-500" />
        <span>Frequently Asked Inquiries</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {defaultPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(prompt)}
            className="text-[11px] py-1 px-2.5 rounded-full bg-white hover:bg-pine-100 hover:text-pine-900 border border-stone-200 text-charcoal-700 font-medium transition-colors text-left"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
