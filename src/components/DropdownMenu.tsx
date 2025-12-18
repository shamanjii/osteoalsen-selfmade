"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const isControlled = externalIsOpen !== undefined && onOpenChange !== undefined;

  // Determine current open state
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  // Unified function to change state (works for both controlled and uncontrolled)
  const handleSetIsOpen = (open: boolean) => {
    if (isControlled && onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  // Close dropdown when route changes (navigation successful)
  useEffect(() => {
    if (isOpen) {
      handleSetIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleSetIsOpen(false);
        onItemClick?.();
      }
    }

    // Small delay to avoid closing immediately on open
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onItemClick]);

  // Close dropdown when scrolling starts
  useEffect(() => {
    if (!isOpen) return;

    function handleScroll() {
      handleSetIsOpen(false);
      onItemClick?.();
    }

    // Add scroll listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, onItemClick]);

  const toggleDropdown = () => {
    handleSetIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (!isOpen) {
      handleSetIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    // Only close on mouse leave if using hover behavior
    // Commenting out for now to allow clicking
    // handleSetIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseLeave={handleMouseLeave}
    >
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={toggleDropdown}
        onMouseEnter={handleMouseEnter}
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
          className="absolute top-full left-0 pt-2 w-64 z-50"
          onMouseEnter={() => handleSetIsOpen(true)}
        >
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 py-2">
            {showAllLink && (
              <div className="border-b border-slate-200 pb-2 mb-2">
                <Link
                  href={allLinkHref}
                  className="flex items-center gap-2 px-4 py-2.5 text-slate-900 font-semibold hover:bg-slate-50 transition-colors block"
                >
                  <span className="text-sm">{allLinkLabel}</span>
                </Link>
              </div>
            )}
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors block"
              >
                {item.icon && <span className="text-xl">{item.icon}</span>}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
