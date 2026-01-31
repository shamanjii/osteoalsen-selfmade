'use client';

import { useEffect } from 'react';

export default function ChatbotWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('chatbot-widget-script')) return;

    const script = document.createElement('script');
    script.id = 'chatbot-widget-script';
    script.src = 'https://digital-rezeption.de/api/embed/chatbot.js';
    script.async = true;
    script.dataset.websiteId = 'd42c9093-1e01-443a-a6e4-30b797f20b22';
    script.dataset.apiUrl = 'https://digital-rezeption.de';
    script.dataset.position = 'bottom-right';
    script.dataset.title = 'Digitale Empfangskraft';
    script.dataset.color = '#1a2233';

    document.head.appendChild(script);
  }, []);

  return null;
}
