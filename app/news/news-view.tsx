import type { Metadata } from "next";
import { headers } from "next/headers";
import Grain from "../components/grain";
import SiteEffects from "../components/site-effects";
import SiteNav from "../components/site-nav";
import { Footer } from "../components/site-sections";
import News from "../components/news";
import { getNews, getNewsById } from "../../lib/data";
import type { NewsItem } from "../../lib/types";
import { getImageSize } from "../../lib/image-size";

/** Looks up a story for a shared link; bad or unknown ids → null. */
export async function findStory(id: string): Promise<NewsItem | null> {
  try {
    return await getNewsById(id);
  } catch {
    return null;
  }
}

/** Public URL of a path on the host the request came in on. */
async function absoluteUrl(path: string): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  return new URL(path, `${proto}://${host}`).toString();
}

/** Open Graph / X card tags so shared links preview with the story's
 *  title, excerpt and cover photo. `path` is the story's own URL path. */
export async function storyMetadata(
  item: NewsItem,
  siteName: string,
  path: string,
): Promise<Metadata> {
  const url = await absoluteUrl(path);
  const cover = item.images[0];
  const size = cover ? await getImageSize(cover) : null;
  const images = cover
    ? [{ url: cover, alt: item.title, ...(size ?? {}) }]
    : undefined;

  return {
    title: `${item.title} · ${siteName}`,
    description: item.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
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
