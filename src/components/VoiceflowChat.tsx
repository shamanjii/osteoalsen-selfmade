'use client';

import Script from 'next/script';

export default function VoiceflowChat() {
  return (
    <Script
      id="voiceflow-chat"
      strategy="lazyOnload"
      src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
      onLoad={() => {
        if (typeof window !== 'undefined' && window.voiceflow) {
          window.voiceflow.chat.load({
            verify: { projectID: '696a0596d51a8efcac952b04' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            voice: {
              url: 'https://runtime-api.voiceflow.com'
            }
          });
        }
      }}
    />
  );
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
