"use client";

import { useState } from "react";
import Link from "next/link";

const links: [label: string, href: string][] = [
  ["Home", "#top"],
  ["Team", "#team"],
  ["Players", "#players"],
  ["News", "#news"],
  ["Contact", "#contact"],
];

export default function SiteNav({
  logoSrc = "/logo.jpg",
  logoAlt = "Human Warriors crest",
  brandTop = "HUMAN",
  brandBottom = "WARRIORS",
  brandSub = "Est. 2024 · MBA",
  secondaryCta = { label: "Human Divas", href: "/divas" },
}: {
  logoSrc?: string;
  logoAlt?: string;
  brandTop?: string;
  brandBottom?: string;
  brandSub?: string;
  secondaryCta?: { label: string; href: string } | null;
} = {}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav" id="siteNav">
      <a href="#top" className="nav-brand">
        <img src={logoSrc} alt={logoAlt} />
        <span className="word">
          {brandTop}
          <br />
          {brandBottom}
          <span>{brandSub}</span>
        </span>
      </a>
      <ul className={`nav-links${menuOpen ? " open" : ""}`} id="navLinks">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          </li>
        ))}
        {secondaryCta && (
          <li className="nav-links-cta">
            <Link href={secondaryCta.href} onClick={() => setMenuOpen(false)}>
              {secondaryCta.label}
            </Link>
          </li>
        )}
      </ul>
      <div className="nav-cta">
        {secondaryCta && (
          <Link href={secondaryCta.href} className="btn btn-outline">
            {secondaryCta.label}
          </Link>
        )}
        <a href="#players" className="btn btn-outline">
          Roster
        </a>
        <button
          className={`nav-toggle${menuOpen ? " open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
