import SiteEffects from "./components/site-effects";
import SiteNav from "./components/site-nav";
import { Hero, Footer } from "./components/site-sections";
import { Team } from "./components/team";
import News from "./components/news";
import Players from "./components/players";
import {
  getCoaches,
  getNews,
  getPlayerPopupEnabled,
  getPlayers,
} from "../lib/data";

export default async function HomePage() {
  const [players, coaches, news, playerPopup] = await Promise.all([
    getPlayers("warriors"),
    getCoaches("warriors"),
    getNews(),
    getPlayerPopupEnabled("warriors"),
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
        <Players players={players} popupEnabled={playerPopup} />
        <News items={news} limit={4} moreHref="/news" />
      </main>
      <Footer />
      <SiteEffects />
    </>
  );
}
