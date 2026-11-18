"use client";

import { useState } from "react";
import Link from "next/link";

export default function SiteNav({
  homeHref = "/",
  newsHref = "/news",
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
  /** The team's home page; section links point at its anchors. */
  homeHref?: string;
  /** The full news page. */
  newsHref?: string;
} = {}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Anchors are prefixed with the home path so they also work from
  // other pages (e.g. /news). Contact is the footer, present everywhere.
  const links: [label: string, href: string][] = [
    ["Home", `${homeHref}#top`],
    ["Team", `${homeHref}#team`],
    ["Players", `${homeHref}#players`],
    ["News", newsHref],
    ["Contact", "#contact"],
  ];

  return (
    <nav className="nav" id="siteNav">
      <a href={`${homeHref}#top`} className="nav-brand">
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
        <a href={`${homeHref}#players`} className="btn btn-outline">
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
