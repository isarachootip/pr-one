import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isUpcoming, type EventRow } from "@/lib/events";
import { clean, isBot, isEmail, localeOf } from "@/lib/validate";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (isBot(body)) return NextResponse.json({ ok: true });

  const ev = db().prepare("SELECT * FROM events WHERE slug = ? AND status = 'published'").get(clean(body.slug, 200)) as unknown as EventRow | undefined;
  if (!ev) return NextResponse.json({ ok: false, error: "generic" }, { status: 404 });
  if (!isUpcoming(ev) || !ev.registration_open) return NextResponse.json({ ok: false, error: "closed" }, { status: 409 });

  const rec = {
    first: clean(body.firstName, 100),
    last: clean(body.lastName, 100),
    email: clean(body.email, 200).toLowerCase(),
    phone: clean(body.phone, 40),
    company: clean(body.company, 200),
    job: clean(body.jobTitle, 200),
  };
  const errors: Record<string, string> = {};
  if (!rec.first) errors.firstName = "required";
  if (!rec.last) errors.lastName = "required";
  if (!isEmail(rec.email)) errors.email = "email";
  if (!rec.company) errors.company = "required";
  if (body.consent !== true) errors.consent = "consent";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });

  const d = db();
  if (ev.capacity) {
    const { n } = d.prepare("SELECT COUNT(*) AS n FROM registrations WHERE event_id = ?").get(ev.id) as { n: number };
    if (n >= ev.capacity) return NextResponse.json({ ok: false, error: "full" }, { status: 409 });
  }
  try {
    d.prepare(
      `INSERT INTO registrations (event_id, first_name, last_name, email, phone, company, job_title, locale) VALUES (?,?,?,?,?,?,?,?)`
    ).run(ev.id, rec.first, rec.last, rec.email, rec.phone, rec.company, rec.job, localeOf(body.locale));
  } catch (e) {
    if (String(e).includes("UNIQUE")) return NextResponse.json({ ok: false, error: "already" }, { status: 409 });
    throw e;
  }
  return NextResponse.json({ ok: true });
}
