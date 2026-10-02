import SiteEffects from "./components/site-effects";
import SiteNav from "./components/site-nav";
import { Hero, Team, Footer } from "./components/site-sections";
import News from "./components/news";
import Players from "./components/players";
import { getCoaches, getNews, getPlayers } from "../lib/data";

export default async function HomePage() {
  const [players, coaches, news] = await Promise.all([
    getPlayers("warriors"),
    getCoaches("warriors"),
    getNews(),
  ]);

  return (
    <>
      <div className="grain" aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="n">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#n)" />
        </svg>
      </div>
      <SiteNav />
      <main>
        <Hero />
        <Team coaches={coaches} />
        <Players players={players} />
        <News items={news} />
      </main>
      <Footer />
      <SiteEffects />
    </>
  );
}
