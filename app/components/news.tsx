"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { NewsItem } from "../../lib/types";

// Two rows on desktop (4 per row); "Show more" reveals the next batch.
const PAGE_SIZE = 8;

function NewsGallery({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (i + images.length) % images.length;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    if (images.length < 2) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goTo(index - 1);
      if (event.key === "ArrowRight") goTo(index + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  return (
    <div className="news-gallery">
      <div
        className="news-gallery-track"
        ref={trackRef}
        onScroll={(event) => {
          const track = event.currentTarget;
          setIndex(Math.round(track.scrollLeft / track.clientWidth));
        }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Photo ${i + 1} of ${images.length}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="news-gallery-arrow prev"
            onClick={() => goTo(index - 1)}
            aria-label="Previous photo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="news-gallery-arrow next"
            onClick={() => goTo(index + 1)}
            aria-label="Next photo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <div className="news-gallery-dots">
            {images.map((src, i) => (
              <button
                type="button"
                key={src}
                className={i === index ? "active" : ""}
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function NewsModal({
  item,
  onClose,
}: {
  item: NewsItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return undefined;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="modal-backdrop open"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`modal-panel news-modal${item.images.length ? "" : " no-photo"}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} article`}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {item.images.length > 0 && <NewsGallery images={item.images} />}
        <div className="news-modal-content">
          <div className="news-modal-head">
            <span className="news-tag">{item.tag}</span>
            <div className="news-date">{item.date}</div>
            <h3 className="news-modal-title">{item.title}</h3>
          </div>
          <div className="news-modal-scroll">
            <p className="news-modal-text">{item.body || item.excerpt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function News({
  items,
  eyebrow = "Club News",
  title = (
    <>
      From The <em>Locker Room</em>
    </>
  ),
  limit,
  moreHref,
  asPage = false,
}: {
  items: NewsItem[];
  eyebrow?: string;
  title?: ReactNode;
  /** Preview mode (home page): show only this many stories. */
  limit?: number;
  /** Link for the "View all news" button shown in preview mode. */
  moreHref?: string;
  /** Standalone news page: h1 heading and room for the fixed nav. */
  asPage?: boolean;
}) {
  const [activeItem, setActiveItem] = useState<NewsItem | null>(null);
  const [visible, setVisible] = useState(limit ?? PAGE_SIZE);

  if (items.length === 0) return null;

  // Featured stories first, then newest first (items arrive date-sorted).
  const ordered = [
    ...items.filter((item) => item.featured),
    ...items.filter((item) => !item.featured),
  ];
  const shown = ordered.slice(0, visible);

  return (
    <section id="news" className={asPage ? "news-page" : undefined}>
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            {asPage ? (
              <h1 className="section-title">{title}</h1>
            ) : (
              <h2 className="section-title">{title}</h2>
            )}
          </div>
        </div>
        <div className={`news-grid reveal${limit ? " preview" : ""}`}>
          {shown.map((item) => (
            <button
              type="button"
              className="news-post"
              key={item.id}
              onClick={() => setActiveItem(item)}
            >
              <div className="news-post-media">
                {item.images[0] ? (
                  <img src={item.images[0]} alt="" loading="lazy" />
                ) : (
                  <span className="news-post-placeholder">{item.tag}</span>
                )}
                {item.images.length > 1 && (
                  <span className="news-photo-count">
                    {item.images.length} photos
                  </span>
                )}
              </div>
              <div className="news-post-body">
                <span className="news-tag">{item.tag}</span>
                <div className="news-date">{item.date}</div>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>
              </div>
            </button>
          ))}
        </div>
        {moreHref ? (
          <div className="news-more">
            <Link href={moreHref}>
              View all news
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        ) : (
          ordered.length > visible && (
            <div className="news-more">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
              >
                Show more news
              </button>
            </div>
          )
        )}
      </div>
      <NewsModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
}
