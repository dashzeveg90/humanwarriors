"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { NewsItem } from "../../lib/types";

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
        className="modal-panel"
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
        {item.img && (
          <img className="modal-photo" src={item.img} alt="" />
        )}
        <div className="modal-head">
          <span className="news-tag">{item.tag}</span>
          <div className="news-date">{item.date}</div>
          <div className="modal-name">{item.title}</div>
        </div>
        <div className="modal-body">
          <p className="modal-bio">{item.body || item.excerpt}</p>
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
}: {
  items: NewsItem[];
  eyebrow?: string;
  title?: ReactNode;
}) {
  const [activeItem, setActiveItem] = useState<NewsItem | null>(null);

  const featured = items.find((item) => item.featured) ?? items[0];
  const stories = items.filter((item) => item.id !== featured?.id);

  if (!featured) return null;

  return (
    <section id="news">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
        <div className="news-grid">
          <button
            type="button"
            className="news-feature reveal"
            onClick={() => setActiveItem(featured)}
          >
            {featured.img && (
              <img src={featured.img} alt="" />
            )}
            <div className="news-feature-body">
              <span className="news-tag">{featured.tag}</span>
              <div className="news-date">{featured.date}</div>
              <h3 className="news-title">{featured.title}</h3>
              <p className="news-excerpt">{featured.excerpt}</p>
            </div>
          </button>
          <div className="news-list reveal">
            {stories.map((item) => (
              <button
                type="button"
                className="news-card"
                key={item.id}
                onClick={() => setActiveItem(item)}
              >
                <span className="news-tag">{item.tag}</span>
                <div className="news-date">{item.date}</div>
                <h4 className="news-title">{item.title}</h4>
                <p className="news-excerpt">{item.excerpt}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <NewsModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
}
