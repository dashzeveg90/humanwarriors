import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WarriorsNewsView, { findStory, storyMetadata } from "../news-view";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await findStory(id);
  return item ? storyMetadata(item, "Human Warriors") : {};
}

export default async function WarriorsStoryPage({ params }: Props) {
  const { id } = await params;
  if (!(await findStory(id))) notFound();
  return <WarriorsNewsView initialId={id} />;
}
