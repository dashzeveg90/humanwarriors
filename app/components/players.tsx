"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Player } from "../../lib/types";

function PlayerModal({
  player,
  onClose,
}: {
  player: Player | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!player) return undefined;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [player, onClose]);

  if (!player) return null;

  return (
    <div
      className="modal-backdrop open"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`modal-panel${player.img ? " has-photo" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${player.name} player profile`}
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
          {player.img && (
            <>
              <img className="modal-head-photo" src={player.img} alt="" />
              <div className="modal-head-overlay" />
            </>
          )}
          <div className="modal-num">{player.num}</div>
          <div className="pc-pos-badge">
            {player.short} · {player.pos}
          </div>
          <div className="modal-name">{player.name}</div>
        </div>
        <div className="modal-body">
          <div className="modal-stats">
            {[
              [player.ppg, "PPG"],
              [player.rpg, "RPG"],
              [player.apg, "APG"],
              [`${player.fg}%`, "FG"],
            ].map(([value, label]) => (
              <div key={label}>
                <b className="tab-nums">{value}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="modal-bio">{player.bio}</p>
          <div className="modal-facts">
            {[
              [`${player.h} cm`, "Height"],
              [`${player.w} kg`, "Weight"],
              [player.age, "Age"],
              [player.home, "Hometown"],
            ].map(([value, label]) => (
              <div key={label}>
                <b className="tab-nums">{value}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Players({
  players,
  eyebrow = "2026–2027 Roster",
  title = (
    <>
      Meet The <em>Warriors</em>
    </>
  ),
}: {
  players: Player[];
  eyebrow?: string;
  title?: ReactNode;
}) {
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);

  return (
    <section id="players" className="section-alt">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
        <div className="players-grid">
          {players.map((player) => (
            <article
              className="player-card reveal"
              key={player.id}
              tabIndex={0}
              role="button"
              onClick={() => setActivePlayer(player)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActivePlayer(player);
                }
              }}
            >
              {player.img && (
                <>
                  <img className="pc-photo" src={player.img} alt="" />
                  <div className="pc-photo-overlay" />
                </>
              )}
              <div className="pc-pos-badge">{player.short}</div>
              <div className="pc-num">{player.num}</div>
              <div className="pc-info">
                <div className="pc-name">{player.name}</div>
                <div className="pc-pos">
                  {player.pos} · No. {player.num}
                </div>
                <div className="pc-meta">
                  <div>
                    <b>{player.h}cm</b>
                    <span>Height</span>
                  </div>
                  <div>
                    <b>{player.ppg}</b>
                    <span>PPG</span>
                  </div>
                  <div>
                    <b>{player.rpg}</b>
                    <span>RPG</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <PlayerModal
        player={activePlayer}
        onClose={() => setActivePlayer(null)}
      />
    </section>
  );
}
