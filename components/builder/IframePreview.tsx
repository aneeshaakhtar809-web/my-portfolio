'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IframePreviewProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function IframePreview({
  children,
  className = 'w-full h-full border-none',
  title = 'Device Preview',
}: IframePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    // Transfer root font classes and styles so Geist and all variables load cleanly
    const rootClasses = document.documentElement.className;
    const bodyClasses = document.body.className;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en" class="${rootClasses}">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              min-height: 100%;
              background-color: transparent;
              overflow-x: hidden;
              -webkit-font-smoothing: antialiased;
            }
            #preview-root {
              width: 100%;
              min-height: 100%;
              overflow-x: hidden;
            }
            /* Custom thin scrollbar for preview */
            ::-webkit-scrollbar {
              width: 5px;
              height: 5px;
            }
            ::-webkit-scrollbar-track {
              background: transparent;
            }
            ::-webkit-scrollbar-thumb {
              background: rgba(148, 163, 184, 0.25);
              border-radius: 9999px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: rgba(148, 163, 184, 0.45);
            }
          </style>
        </head>
        <body class="${bodyClasses}">
          <div id="preview-root"></div>
        </body>
      </html>
    `);
    doc.close();

    // Copy all link and style elements from host document into iframe head
    const syncStyles = () => {
      const head = doc.head;
      const existingHeadNodes = new Set(
        Array.from(head.children).map((c) =>
          (c as HTMLLinkElement).href || (c as HTMLElement).innerText || c.outerHTML
        )
      );

      document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
        const idKey = (node as HTMLLinkElement).href || (node as HTMLElement).innerText || node.outerHTML;
        if (!existingHeadNodes.has(idKey)) {
          head.appendChild(node.cloneNode(true));
          existingHeadNodes.add(idKey);
        }
      });
    };

    syncStyles();

    // Listen for any dynamically injected Next.js/Turbopack styles
    const observer = new MutationObserver(() => {
      syncStyles();
    });
    observer.observe(document.head, { childList: true, subtree: true });

    const root = doc.getElementById('preview-root') || doc.body;
    setMountNode(root);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      className={className}
      tabIndex={-1}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}


