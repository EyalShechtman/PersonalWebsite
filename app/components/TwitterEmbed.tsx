'use client';

import { useEffect, useRef } from 'react';

interface TwitterEmbedProps {
  html: string;
}

export default function TwitterEmbed({ html }: TwitterEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widgets script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Process the embed after a short delay to ensure the script is loaded
    const timer = setTimeout(() => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(containerRef.current);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="twitter-embed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
