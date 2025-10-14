"use client";
import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string | React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-start justify-between gap-4 cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-slate-900 font-epilogue pr-4">
          {question}
        </span>
        <span
          className={`shrink-0 transition-transform duration-300 text-slate-500 group-hover:text-slate-900 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 text-slate-700 leading-relaxed">
          {typeof answer === "string" ? (
            <div className="whitespace-pre-line">{answer}</div>
          ) : (
            answer
          )}
        </div>
      </div>
    </div>
  );
}
