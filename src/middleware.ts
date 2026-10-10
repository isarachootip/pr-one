import { NextResponse, type NextRequest } from "next/server";

// Basic-auth guard for /admin and /api/admin/*
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER || "admin";
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return new NextResponse("Set ADMIN_PASSWORD to enable the admin area.", { status: 503 });

  const header = req.headers.get("authorization") || "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    const [u, p] = atob(encoded).split(":");
    if (u === user && p === pass) return NextResponse.next();
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="PR One admin"' },
  });
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
