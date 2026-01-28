'use client';

import { useEffect, useState } from 'react';

export default function ChatbotWidget() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    if (document.getElementById('chatbot-widget-script')) return;

    const script = document.createElement('script');
    script.id = 'chatbot-widget-script';
    script.src = 'https://pagebot.digger.lol/api/embed/chatbot.js';
    script.async = true;
    script.dataset.websiteId = 'd42c9093-1e01-443a-a6e4-30b797f20b22';
    script.dataset.apiUrl = 'https://pagebot.digger.lol';
    script.dataset.position = 'bottom-right';
    script.dataset.title = 'Digitale Empfangskraft';
    script.dataset.color = '#1a2233';

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('chatbot-widget-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [isMounted]);

  return null;
}
