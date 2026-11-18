"use client";

import { useEffect, useState } from "react";

/** Share bar for a news story: Facebook, X, copy link, and the
 *  device's native share sheet (Messenger, Instagram DM, etc.) where
 *  the browser supports it. `path` is the story's own URL path. */
export default function ShareButtons({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  const [url, setUrl] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // The absolute URL depends on the host the visitor is on.
  useEffect(() => {
    setUrl(new URL(path, window.location.origin).toString());
    setCanNativeShare(typeof navigator.share === "function");
  }, [path]);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const openPopup = (href: string) => {
    window.open(href, "share", "noopener,noreferrer,width=600,height=560");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // Dismissed by the user — nothing to do.
    }
  };

  return (
    <div className="news-share">
      <span className="news-share-label">Share</span>
      <button
        type="button"
        className="news-share-btn"
        disabled={!url}
        onClick={() =>
          openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)
        }
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.1L14 2c-3.3 0-4 2.4-4 4v2.5H8V12h2v10h4V12h2.7l.4-3.5H14z" />
        </svg>
      </button>
      <button
        type="button"
        className="news-share-btn"
        disabled={!url}
        onClick={() =>
          openPopup(
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
          )
        }
        aria-label="Share on X"
        title="Share on X"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.2L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z" />
        </svg>
      </button>
      <button
        type="button"
        className="news-share-btn"
        disabled={!url}
        onClick={copyLink}
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12l5 5 9-10" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
            <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
          </svg>
        )}
      </button>
      {canNativeShare && (
        <button
          type="button"
          className="news-share-btn"
          onClick={nativeShare}
          aria-label="More sharing options"
          title="More sharing options"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
          </svg>
        </button>
      )}
      <span className="news-share-status" role="status">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
