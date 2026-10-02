import SiteEffects from "../components/site-effects";
import SiteNav from "../components/site-nav";
import { Hero, Team, Footer } from "../components/site-sections";
import News from "../components/news";
import Players from "../components/players";
import { getCoaches, getNews, getPlayers } from "../../lib/data";

export const metadata = {
  title: "Human Divas",
  description: "Meet Human Divas, the women's basketball team.",
};

export default async function DivasPage() {
  const [players, coaches, news] = await Promise.all([
    getPlayers("divas"),
    getCoaches("divas"),
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
      <SiteNav
        logoSrc="/divaslogo.jpg"
        logoAlt="Human Divas crest"
        brandTop="HUMAN"
        brandBottom="DIVAS"
        brandSub="Est. 2026 · MBA"
        secondaryCta={{ label: "Human Warriors", href: "/" }}
      />
      <main>
        <Hero
          logoSrc="/divaslogo.jpg"
          logoAlt="Human Divas crest"
          league={<>MBA · M Development League · 2026–2027</>}
          titleTop="HUMAN"
          titleAccent="DIVAS"
          tag={
            <>
              Built to Win. <strong>Born to Defend.</strong>
            </>
          }
          secondaryCta={{ label: "Latest News", href: "#news" }}
        />
        <Team
          eyebrow="Front Office"
          title={
            <>
              Meet The <em>Coaches</em>
            </>
          }
          coaches={coaches}
        />
        <Players
          players={players}
          eyebrow="2026–2027 Roster"
          title={
            <>
              Meet The <em>Divas</em>
            </>
          }
        />
        <News items={news} />
      </main>
      <Footer
        logoSrc="/divaslogo.jpg"
        logoAlt="Human Divas crest"
        brandName="HUMAN DIVAS"
        tagline="Rise Together · Play Fearless"
        description="A women's professional basketball club competing in the MBA's M Development League, based in Ulaanbaatar, Mongolia."
      />
      <SiteEffects />
    </>
  );
}
