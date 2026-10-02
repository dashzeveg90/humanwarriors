import type { ReactNode } from "react";
import type { Coach } from "../../lib/types";

export function Hero({
  logoSrc = "/logo.jpg",
  logoAlt = "",
  league = <>MBA · M Development League · 2026–2027</>,
  titleTop = "HUMAN",
  titleAccent = "WARRIORS",
  tag = (
    <>
      Built to Win. <strong>Born to Defend.</strong>
    </>
  ),
  primaryCta = { label: "Meet the Team", href: "#players" },
  secondaryCta = { label: "Latest News", href: "#news" },
}: {
  logoSrc?: string;
  logoAlt?: string;
  league?: ReactNode;
  titleTop?: string;
  titleAccent?: string;
  tag?: ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
} = {}) {
  return (
    <header className="hero" id="top">
      <div className="hero-emblem" id="heroEmblem">
        <img src={logoSrc} alt={logoAlt} />
      </div>
      <div className="hero-inner">
        <div className="hero-league reveal in">
          <span className="dot" /> {league}
        </div>
        <h1 className="reveal in">
          {titleTop}
          <br />
          <span className="accent">{titleAccent}</span>
        </h1>
        <p className="hero-tag reveal in">{tag}</p>
        <div className="hero-ctas reveal in">
          <a href={primaryCta.href} className="btn btn-solid">
            {primaryCta.label}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href={secondaryCta.href} className="btn btn-outline">
            {secondaryCta.label}
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </header>
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
            <div className="coach-card reveal" key={coach.id}>
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
    </section>
  );
}

export function Footer({
  logoSrc = "/logo.jpg",
  logoAlt = "Human Warriors crest",
  brandName = "HUMAN WARRIORS",
  tagline = "Built to Win · Born to Defend",
  description = (
    <>
      A professional basketball club competing in the MBA&apos;s M
      Development League, based in Ulaanbaatar, Mongolia.
    </>
  ),
}: {
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  tagline?: string;
  description?: ReactNode;
} = {}) {
  return (
    <footer id="contact">
      <img className="foot-emblem" src={logoSrc} alt="" />
      <div className="wrap foot-grid">
        <div>
          <div className="foot-brand">
            <img src={logoSrc} alt={logoAlt} />
            <div className="foot-word">
              {brandName}
              <span>{tagline}</span>
            </div>
          </div>
          <p className="foot-desc">{description}</p>
          <div className="foot-social">
            <a href="#contact" aria-label="Instagram">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" />
              </svg>
            </a>
            <a href="#contact" aria-label="Facebook">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z" />
              </svg>
            </a>
            <a href="#contact" aria-label="YouTube">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="2.5" y="6" width="19" height="12" rx="3" />
                <path
                  d="M10.5 9.5l5 2.5-5 2.5z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a href="#contact" aria-label="X">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <div className="foot-h">Navigate</div>
          <ul className="foot-links">
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#players">Players</a>
            </li>
            <li>
              <a href="#news">News</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="foot-h">Contact</div>
          <div className="foot-contact">
            <div>+976 7700 1924</div>
            <div>info@humanwarriors.mn</div>
          </div>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>
          © {new Date().getFullYear()} Human Warriors Basketball Club. All
          rights reserved.
        </span>
        <span>MBA · M Development League</span>
      </div>
    </footer>
  );
}
