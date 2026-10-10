"use server";

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkCredentials, createSession, SESSION_COOKIE, verifySession } from "@/lib/auth";
import { db, uploadsDir } from "@/lib/db";
import { deleteEvent, EVENT_MODES, EVENT_TYPES, saveEvent, slugTaken, type EventText } from "@/lib/events";
import { locales, type Locale } from "@/i18n/config";

async function requireAdmin() {
  const user = await verifySession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!user) redirect("/admin/login");
  return user;
}

// ---------- auth ----------

export async function login(_prev: { error?: string; username?: string } | undefined, form: FormData) {
  const user = String(form.get("username") ?? "");
  const pass = String(form.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD) return { error: "ADMIN_PASSWORD is not set on the server.", username: user };
  if (!checkCredentials(user, pass)) {
    await new Promise((r) => setTimeout(r, 600));
    return { error: "Wrong username or password.", username: user };
  }
  const s = await createSession(user);
  (await cookies()).set(SESSION_COOKIE, s.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" && process.env.INSECURE_COOKIES !== "1",
    path: "/",
    maxAge: s.maxAge,
  });
  const next = String(form.get("next") ?? "");
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ---------- events ----------

export type EventFormState = { error?: string; fieldErrors?: Record<string, string>; saved?: boolean };

const toIso = (v: string) => (v ? new Date(`${v}:00+07:00`).toISOString() : null);
const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 80);

async function storeUpload(file: File) {
  const ext = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[file.type];
  if (!ext) throw new Error("Cover must be a JPG, PNG or WebP image.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Cover image must be 8 MB or smaller.");
  const name = `${randomUUID()}.${ext}`;
  await fs.mkdir(uploadsDir(), { recursive: true });
  await fs.writeFile(path.join(uploadsDir(), name), Buffer.from(await file.arrayBuffer()));
  return `/media/${name}`;
}

export async function saveEventAction(_prev: EventFormState | undefined, form: FormData): Promise<EventFormState> {
  await requireAdmin();
  const id = Number(form.get("id")) || undefined;
  const s = (k: string) => String(form.get(k) ?? "").trim();

  const texts: Partial<Record<Locale, EventText>> = {};
  for (const l of locales) {
    texts[l] = { title: s(`title_${l}`), summary: s(`summary_${l}`), venue: s(`venue_${l}`), audience: s(`audience_${l}`), body: s(`body_${l}`) };
  }
  const fieldErrors: Record<string, string> = {};
  if (!texts.en!.title && !texts.th!.title) fieldErrors.title_en = "Enter a title in English or Thai.";

  let slug = slugify(s("slug") || texts.en!.title || "");
  if (!slug) slug = `event-${Date.now().toString(36)}`;
  if (slugTaken(slug, id)) fieldErrors.slug = "Another event already uses this URL.";

  const type = s("type");
  const mode = s("mode");
  const startsAt = toIso(s("starts_at"));
  const endsAt = toIso(s("ends_at"));
  if (startsAt && endsAt && endsAt < startsAt) fieldErrors.ends_at = "End must be after the start.";
  const yearRaw = s("year");
  const year = yearRaw ? Number(yearRaw) : startsAt ? Number(new Date(startsAt).toLocaleString("en-US", { timeZone: "Asia/Bangkok", year: "numeric" })) : null;
  if (year !== null && (!Number.isInteger(year) || year < 2000 || year > 2100)) fieldErrors.year = "Year looks wrong.";
  const capacityRaw = s("capacity");
  const capacity = capacityRaw ? Number(capacityRaw) : null;
  if (capacity !== null && (!Number.isInteger(capacity) || capacity < 1)) fieldErrors.capacity = "Capacity must be a whole number.";
  if (Object.keys(fieldErrors).length) return { fieldErrors, error: "Please fix the highlighted fields." };

  let cover = s("cover_current");
  if (form.get("cover_remove") === "on") cover = "";
  const file = form.get("cover_file");
  if (file instanceof File && file.size > 0) {
    try {
      cover = await storeUpload(file);
    } catch (e) {
      return { fieldErrors: { cover: (e as Error).message }, error: "Please fix the highlighted fields." };
    }
  }

  const newId = saveEvent(
    {
      slug,
      type: (EVENT_TYPES as readonly string[]).includes(type) ? type : "OTHER",
      mode: (EVENT_MODES as readonly string[]).includes(mode) ? mode : "IN_PERSON",
      status: s("status") === "published" ? "published" : "draft",
      featured: form.get("featured") === "on" ? 1 : 0,
      client: s("client"),
      starts_at: startsAt,
      ends_at: endsAt,
      year,
      cover,
      registration_open: form.get("registration_open") === "on" ? 1 : 0,
      capacity,
      sort: Number(s("sort")) || 0,
      texts,
    },
    id
  );
  revalidatePath("/", "layout");
  if (!id) redirect(`/admin/events/${newId}?created=1`);
  return { saved: true };
}

export async function deleteEventAction(form: FormData) {
  await requireAdmin();
  deleteEvent(Number(form.get("id")));
  revalidatePath("/", "layout");
  redirect("/admin/events");
}

export async function deleteRegistrationAction(form: FormData) {
  await requireAdmin();
  db().prepare("DELETE FROM registrations WHERE id = ?").run(Number(form.get("id")));
  revalidatePath("/admin", "layout");
}

export async function toggleHandledAction(form: FormData) {
  await requireAdmin();
  db().prepare("UPDATE contacts SET handled = 1 - handled WHERE id = ?").run(Number(form.get("id")));
  revalidatePath("/admin/inbox");
}

export async function deleteSubscriberAction(form: FormData) {
  await requireAdmin();
  db().prepare("DELETE FROM subscribers WHERE id = ?").run(Number(form.get("id")));
  revalidatePath("/admin/subscribers");
}
