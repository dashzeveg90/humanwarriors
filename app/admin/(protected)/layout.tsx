import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { createClient } from "../../../lib/supabase/server";
import { signOut } from "../actions";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <>
      <nav className="admin-nav">
        <Link href="/admin" className="admin-nav-brand">
          HUMAN ADMIN
        </Link>
        <div className="admin-nav-links">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/news">News</Link>
          <Link href="/admin/players">Players</Link>
          <Link href="/admin/coaches">Coaches</Link>
        </div>
        <form action={signOut}>
          <button type="submit" className="admin-btn">
            Sign Out
          </button>
        </form>
      </nav>
      <main className="admin-main">{children}</main>
    </>
  );
}
