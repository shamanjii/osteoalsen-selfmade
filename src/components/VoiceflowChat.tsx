'use client';

import { useEffect, useState } from 'react';

export default function VoiceflowChat() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run after component is mounted
    if (!isMounted || typeof window === 'undefined') return;

    // Check if script already exists
    if (document.getElementById('voiceflow-script')) return;

    const script = document.createElement('script');
    script.id = 'voiceflow-script';
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';

    script.onload = () => {
      if (window.voiceflow) {
        window.voiceflow.chat.load({
          verify: { projectID: '696a0596d51a8efcac952b04' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: 'https://runtime-api.voiceflow.com'
          }
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount (optional)
      const existingScript = document.getElementById('voiceflow-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [isMounted]);

  return null;
}

// Type declaration for Voiceflow
declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: {
          verify: { projectID: string };
          url: string;
          versionID: string;
          voice?: { url: string };
        }) => void;
      };
    };
  }
}
