"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Coach } from "../../lib/types";

function CoachModal({
  coach,
  onClose,
}: {
  coach: Coach | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!coach) return undefined;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [coach, onClose]);

  if (!coach) return null;

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
        aria-label={`${coach.name} coach profile`}
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
        <div className="modal-head">
          {coach.img && (
            <>
              <img className="modal-head-photo" src={coach.img} alt="" />
              <div className="modal-head-overlay" />
            </>
          )}
          <div className="pc-pos-badge">{coach.role}</div>
          <div className="modal-name">{coach.name}</div>
        </div>
        <div className="modal-body">
          <p className="modal-bio">{coach.bio}</p>
        </div>
      </div>
    </div>
  );
}

export function Team({
  eyebrow = "Front Office",
  title = (
    <>
      Meet The <em>Coaches</em>
    </>
  ),
  coaches: roster,
}: {
  eyebrow?: string;
  title?: ReactNode;
  coaches: Coach[];
}) {
  const [activeCoach, setActiveCoach] = useState<Coach | null>(null);

  return (
    <section id="team" className="section-alt">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
        <div className="coach-grid">
          {roster.map((coach) => (
            <div
              className="coach-card reveal"
              key={coach.id}
              tabIndex={0}
              role="button"
              onClick={() => setActiveCoach(coach)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveCoach(coach);
                }
              }}
            >
              <div className="coach-top">
                <div className="coach-portrait">
                  {coach.img ? (
                    <img src={coach.img} alt="" />
                  ) : (
                    coach.initials
                  )}
                </div>
                <div>
                  <div className="coach-name">{coach.name}</div>
                  <div className="coach-role">{coach.role}</div>
                </div>
              </div>
              <p className="coach-bio">{coach.bio}</p>
            </div>
          ))}
        </div>
      </div>
      <CoachModal coach={activeCoach} onClose={() => setActiveCoach(null)} />
    </section>
  );
}
