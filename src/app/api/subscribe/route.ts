import { NextResponse } from "next/server";
import { append, clean, isEmail, readAll } from "@/lib/store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = clean(body.email, 200).toLowerCase();
  if (!isEmail(email)) return NextResponse.json({ ok: false, errors: { email: "Please enter a valid work email" } }, { status: 400 });
  const existing = await readAll<{ email: string }>("subscribers");
  if (!existing.some((s) => s.email === email)) await append("subscribers", { email });
  return NextResponse.json({ ok: true });
}
