import Grain from "../components/grain";
import SiteEffects from "../components/site-effects";
import SiteNav from "../components/site-nav";
import { Footer } from "../components/site-sections";
import News from "../components/news";
import { getNews } from "../../lib/data";

export const metadata = {
  title: "News · Human Warriors",
  description: "All the latest news from Human Warriors Basketball Club.",
};

export default async function WarriorsNewsPage() {
  const news = await getNews();

  return (
    <>
      <Grain />
      <SiteNav />
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
      <Footer />
      <SiteEffects />
    </>
  );
}
