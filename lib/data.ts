import { createClient } from "./supabase/server";
import type { Coach, NewsItem, Player, Team } from "./types";

type PlayerRow = {
  id: string;
  team: Team;
  num: number;
  name: string;
  pos: string;
  short: string;
  h: number;
  w: number;
  age: number;
  home: string;
  ppg: number;
  rpg: number;
  apg: number;
  fg: number;
  bio: string;
  sort_order: number;
  img: string | null;
};

type CoachRow = {
  id: string;
  team: Team;
  name: string;
  role: string;
  initials: string;
  bio: string;
  sort_order: number;
  img: string | null;
};

type NewsRow = {
  id: string;
  featured: boolean;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string | null;
  img: string | null;
};

function mapPlayer(row: PlayerRow): Player {
  return {
    id: row.id,
    team: row.team,
    num: row.num,
    name: row.name,
    pos: row.pos,
    short: row.short,
    h: row.h,
    w: row.w,
    age: row.age,
    home: row.home,
    ppg: row.ppg,
    rpg: row.rpg,
    apg: row.apg,
    fg: row.fg,
    bio: row.bio,
    sortOrder: row.sort_order,
    img: row.img,
  };
}

function mapCoach(row: CoachRow): Coach {
  return {
    id: row.id,
    team: row.team,
    name: row.name,
    role: row.role,
    initials: row.initials,
    bio: row.bio,
    sortOrder: row.sort_order,
    img: row.img,
  };
}

function mapNews(row: NewsRow): NewsItem {
  return {
    id: row.id,
    featured: row.featured,
    tag: row.tag,
    date: new Date(row.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    img: row.img,
  };
}

export async function getPlayers(team: Team): Promise<Player[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("team", team)
    .order("sort_order", { ascending: true })
    .order("num", { ascending: true });

  if (error) throw error;
  return (data as PlayerRow[]).map(mapPlayer);
}

export async function getPlayerById(id: string): Promise<Player | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapPlayer(data as PlayerRow) : null;
}

export async function getCoaches(team: Team): Promise<Coach[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("coaches")
    .select("*")
    .eq("team", team)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data as CoachRow[]).map(mapCoach);
}

export async function getCoachById(id: string): Promise<Coach | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("coaches")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapCoach(data as CoachRow) : null;
}

export async function getNews(): Promise<NewsItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return (data as NewsRow[]).map(mapNews);
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapNews(data as NewsRow) : null;
}
