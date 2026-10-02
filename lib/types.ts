export type Team = "warriors" | "divas";

export type Player = {
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
  sortOrder: number;
  img: string | null;
};

export type Coach = {
  id: string;
  team: Team;
  name: string;
  role: string;
  initials: string;
  bio: string;
  sortOrder: number;
  img: string | null;
};

export type NewsItem = {
  id: string;
  featured: boolean;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string | null;
  img: string | null;
};
