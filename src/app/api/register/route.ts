import { NextResponse } from "next/server";
import { append, clean, isEmail } from "@/lib/store";
import { upcomingEvents } from "@/data/site";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const event = upcomingEvents.find((e) => e.slug === clean(body.eventSlug, 100));
  const rec = {
    eventSlug: event?.slug ?? "",
    eventTitle: event?.title ?? "",
    firstName: clean(body.firstName, 100),
    lastName: clean(body.lastName, 100),
    email: clean(body.email, 200).toLowerCase(),
    phone: clean(body.phone, 40),
    company: clean(body.company, 200),
    jobTitle: clean(body.jobTitle, 200),
    consent: body.consent === true,
  };
  const errors: Record<string, string> = {};
  if (!event) errors.eventSlug = "Unknown event";
  if (!rec.firstName) errors.firstName = "Please enter your first name";
  if (!rec.lastName) errors.lastName = "Please enter your last name";
  if (!isEmail(rec.email)) errors.email = "Please enter a valid work email";
  if (!rec.company) errors.company = "Please enter your company";
  if (!rec.consent) errors.consent = "Please accept to continue";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });

  const row = await append("registrations", rec);
  return NextResponse.json({ ok: true, id: row.id });
}
