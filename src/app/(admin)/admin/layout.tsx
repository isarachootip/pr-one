import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import "../../globals.css";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { logout } from "./actions";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = { title: "PR One Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await verifySession((await cookies()).get(SESSION_COOKIE)?.value);
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Sans+Thai:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="min-h-screen">
        {user ? (
          <div className="flex min-h-screen flex-col lg:flex-row">
            <aside className="border-b border-line bg-ink-2 lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0 lg:border-e lg:border-b-0">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 lg:h-full lg:flex-col lg:flex-nowrap lg:items-stretch lg:justify-start lg:p-5">
                <Link href="/admin" className="font-display text-lg font-bold">
                  PR ONE <span className="font-mono text-xs font-normal text-accent">ADMIN</span>
                </Link>
                <AdminNav />
                <div className="flex items-center gap-3 text-sm text-dim lg:mt-auto lg:flex-col lg:items-stretch">
                  <Link href="/th" target="_blank" className="hover:text-fg">View site ↗</Link>
                  <form action={logout}>
                    <button type="submit" className="hover:text-fg">Log out ({user})</button>
                  </form>
                </div>
              </div>
            </aside>
            <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-10">{children}</main>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
