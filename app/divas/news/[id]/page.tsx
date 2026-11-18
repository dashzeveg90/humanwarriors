import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DivasNewsView from "../news-view";
import { findStory, storyMetadata } from "../../../news/news-view";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await findStory(id);
  return item ? storyMetadata(item, "Human Divas") : {};
}

export default async function DivasStoryPage({ params }: Props) {
  const { id } = await params;
  if (!(await findStory(id))) notFound();
  return <DivasNewsView initialId={id} />;
}
