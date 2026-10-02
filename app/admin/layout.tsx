import "./admin.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Admin · Human Warriors",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="admin-shell">{children}</div>;
}
