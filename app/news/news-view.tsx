import type { Metadata } from "next";
import Grain from "../components/grain";
import SiteEffects from "../components/site-effects";
import SiteNav from "../components/site-nav";
import { Footer } from "../components/site-sections";
import News from "../components/news";
import { getNews, getNewsById } from "../../lib/data";
import type { NewsItem } from "../../lib/types";

/** Looks up a story for a shared link; bad or unknown ids → null. */
export async function findStory(id: string): Promise<NewsItem | null> {
  try {
    return await getNewsById(id);
  } catch {
    return null;
  }
}

/** Open Graph / X card tags so shared links preview with the story's
 *  title, excerpt and cover photo. */
export function storyMetadata(item: NewsItem, siteName: string): Metadata {
  const images = item.images[0] ? [item.images[0]] : undefined;
  return {
    title: `${item.title} · ${siteName}`,
    description: item.excerpt,
    openGraph: {
      type: "article",
      siteName,
      title: item.title,
      description: item.excerpt,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: item.title,
      description: item.excerpt,
      images,
    },
  };
}

export default async function WarriorsNewsView({
  initialId,
}: {
  initialId?: string;
}) {
  const news = await getNews();

  return (
    <>
      <Grain />
      <SiteNav />
      <main>
        <News
          items={news}
          asPage
          basePath="/news"
          initialId={initialId}
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
