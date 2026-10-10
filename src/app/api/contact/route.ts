import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clean, isBot, isEmail, localeOf } from "@/lib/validate";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (isBot(body)) return NextResponse.json({ ok: true });
  const rec = {
    name: clean(body.name, 150),
    company: clean(body.company, 200),
    email: clean(body.email, 200).toLowerCase(),
    phone: clean(body.phone, 40),
    eventType: clean(body.eventType, 80),
    eventDate: clean(body.eventDate, 40),
    audience: clean(body.audience, 40),
    message: clean(body.message, 4000),
  };
  const errors: Record<string, string> = {};
  if (!rec.name) errors.name = "required";
  if (!isEmail(rec.email)) errors.email = "email";
  if (!rec.message) errors.message = "required";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });
  db()
    .prepare(`INSERT INTO contacts (name, company, email, phone, event_type, event_date, audience, message, locale) VALUES (?,?,?,?,?,?,?,?,?)`)
    .run(rec.name, rec.company, rec.email, rec.phone, rec.eventType, rec.eventDate, rec.audience, rec.message, localeOf(body.locale));
  return NextResponse.json({ ok: true });
}
