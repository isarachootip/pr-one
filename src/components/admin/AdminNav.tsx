"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["Dashboard", "/admin"],
  ["Events", "/admin/events"],
  ["Proposal requests", "/admin/inbox"],
  ["Subscribers", "/admin/subscribers"],
];

export function AdminNav() {
  const p = usePathname();
  return (
    <nav className="flex flex-wrap gap-1 lg:mt-8 lg:flex-col">
      {items.map(([label, href]) => {
        const on = href === "/admin" ? p === href : p.startsWith(href);
        return (
          <Link key={href} href={href} aria-current={on ? "page" : undefined} className={`rounded-lg px-3 py-2 text-sm ${on ? "bg-accent font-semibold text-ink" : "text-soft hover:bg-panel"}`}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
