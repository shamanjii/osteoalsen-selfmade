"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface DropdownItem {
  label: string;
  href: string;
  icon?: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  showAllLink?: boolean;
  allLinkHref?: string;
  allLinkLabel?: string;
  onItemClick?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function DropdownMenu({
  label,
  items,
  showAllLink = false,
  allLinkHref = "/behandlungen",
  allLinkLabel = "Alle Behandlungen →",
  onItemClick,
  isOpen: externalIsOpen,
  onOpenChange,
}: DropdownMenuProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick?.();
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 flex items-center gap-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleItemClick}
              className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              {item.icon && <span className="text-xl">{item.icon}</span>}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
          {showAllLink && (
            <div className="border-t border-slate-200 mt-2 pt-2">
              <Link
                href={allLinkHref}
                onClick={handleItemClick}
                className="flex items-center gap-2 px-4 py-2.5 text-slate-900 font-semibold hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm">{allLinkLabel}</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
