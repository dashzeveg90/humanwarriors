"use client";

import { useEffect } from "react";

export default function SiteEffects() {
  useEffect(() => {
    const nav = document.getElementById("siteNav");
    const emblem = document.getElementById("heroEmblem");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const updateScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 40);
      if (!reducedMotion && emblem) {
        const y = Math.min(window.scrollY, 600);
        emblem.style.transform = `translateY(calc(-50% + ${y * 0.18}px)) rotate(${y * 0.02}deg)`;
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    document
      .querySelectorAll(".reveal, .reveal-stagger")
      .forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", updateScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
