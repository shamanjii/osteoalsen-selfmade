'use client';

import { useEffect } from 'react';

export default function VoiceflowChat() {
  useEffect(() => {
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
  }, []);

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
