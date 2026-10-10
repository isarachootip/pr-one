import { NextResponse } from "next/server";
import { append, clean, isEmail } from "@/lib/store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const rec = {
    name: clean(body.name, 150),
    company: clean(body.company, 200),
    email: clean(body.email, 200).toLowerCase(),
    phone: clean(body.phone, 40),
    eventType: clean(body.eventType, 60),
    eventDate: clean(body.eventDate, 40),
    audience: clean(body.audience, 60),
    message: clean(body.message, 3000),
  };
  const errors: Record<string, string> = {};
  if (!rec.name) errors.name = "Please enter your name";
  if (!isEmail(rec.email)) errors.email = "Please enter a valid email";
  if (!rec.message) errors.message = "Tell us a little about your event";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });

  const row = await append("contacts", rec);
  return NextResponse.json({ ok: true, id: row.id });
}
