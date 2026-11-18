import Grain from "../../components/grain";
import SiteEffects from "../../components/site-effects";
import SiteNav from "../../components/site-nav";
import { Footer } from "../../components/site-sections";
import News from "../../components/news";
import { getNews } from "../../../lib/data";

export const metadata = {
  title: "News · Human Divas",
  description: "All the latest news from Human Divas.",
};

export default async function DivasNewsPage() {
  const news = await getNews();

  return (
    <>
      <Grain />
      <SiteNav
        logoSrc="/divaslogo.jpg"
        logoAlt="Human Divas crest"
        brandTop="HUMAN"
        brandBottom="DIVAS"
        brandSub="Est. 2026 · MBA"
        homeHref="/divas"
        newsHref="/divas/news"
        secondaryCta={{ label: "Human Warriors", href: "/" }}
      />
      <main>
        <News
          items={news}
          asPage
          eyebrow="Club News"
          title={
            <>
              All <em>News</em>
            </>
          }
        />
      </main>
      <Footer
        logoSrc="/divaslogo.jpg"
        logoAlt="Human Divas crest"
        brandName="HUMAN DIVAS"
        tagline="Rise Together · Play Fearless"
        description="A women's professional basketball club competing in the MBA's M Development League, based in Ulaanbaatar, Mongolia."
        social={{
          instagram: "https://www.instagram.com/human_divas/",
          facebook: "https://www.facebook.com/profile.php?id=61594004103907",
        }}
      />
      <SiteEffects />
    </>
  );
}
