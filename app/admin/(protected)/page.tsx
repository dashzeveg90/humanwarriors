import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [news, players, coaches] = await Promise.all([
    supabase.from("news").select("id", { count: "exact", head: true }),
    supabase.from("players").select("id", { count: "exact", head: true }),
    supabase.from("coaches").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    {
      href: "/admin/news",
      label: "News",
      count: news.count ?? 0,
      sub: "Shared across Warriors & Divas",
    },
    {
      href: "/admin/players",
      label: "Players",
      count: players.count ?? 0,
      sub: "Both rosters combined",
    },
    {
      href: "/admin/coaches",
      label: "Coaches",
      count: coaches.count ?? 0,
      sub: "Both coaching staffs combined",
    },
  ];

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Manage the content shown on the Human Warriors and Human Divas sites.</p>
        </div>
      </div>
      <div className="admin-dash-grid">
        {cards.map((card) => (
          <Link href={card.href} className="admin-dash-card" key={card.href}>
            <div className="n">{card.count}</div>
            <h3>{card.label}</h3>
            <p>{card.sub}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
