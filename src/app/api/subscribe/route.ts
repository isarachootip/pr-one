import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clean, isBot, isEmail, localeOf } from "@/lib/validate";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (isBot(body)) return NextResponse.json({ ok: true });
  const email = clean(body.email, 200).toLowerCase();
  if (!isEmail(email)) return NextResponse.json({ ok: false, errors: { email: "email" } }, { status: 400 });
  db().prepare("INSERT INTO subscribers (email, locale) VALUES (?, ?) ON CONFLICT(email) DO NOTHING").run(email, localeOf(body.locale));
  return NextResponse.json({ ok: true });
}
