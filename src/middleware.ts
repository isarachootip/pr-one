import { NextResponse, type NextRequest } from "next/server";
import { isLocale, matchLocale } from "@/i18n/config";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // ---- admin area ----
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const user = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
    if (user) return NextResponse.next();
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  // ---- public site: every page lives under /{locale} ----
  const first = pathname.split("/")[1];
  if (isLocale(first)) {
    const headers = new Headers(req.headers);
    headers.set("x-pr1-path", pathname);
    const res = NextResponse.next({ request: { headers } });
    if (req.cookies.get("pr1_lang")?.value !== first) res.cookies.set("pr1_lang", first, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return res;
  }
  const saved = req.cookies.get("pr1_lang")?.value;
  const locale = isLocale(saved) ? saved : matchLocale(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api/(?!admin)|_next|img|media|icon|apple-icon|favicon|robots.txt|sitemap.xml).*)"],
};
