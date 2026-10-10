"use client";

import { useActionState, useState } from "react";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import type { EventFormState } from "@/app/(admin)/admin/actions";
import type { EventFull } from "@/lib/events";

const TYPES = ["SEMINAR", "SUMMIT", "CONFERENCE", "ROADSHOW", "EXHIBITION", "LAUNCH", "KICK_OFF", "CUSTOMER_EVENT", "PR", "OTHER"];
const MODES = [
  ["IN_PERSON", "In person"],
  ["HYBRID", "Hybrid"],
  ["VIRTUAL", "Virtual"],
];

/** ISO → value for <input type="datetime-local"> in Bangkok time. */
const toLocal = (iso: string | null) => (iso ? new Date(new Date(iso).getTime() + 7 * 3600000).toISOString().slice(0, 16) : "");

const label = "mb-1.5 block text-sm text-soft";

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1 text-sm text-[#FF9C8A]">{msg}</p> : null;
}

export function EventForm({
  action,
  event,
}: {
  action: (s: EventFormState | undefined, f: FormData) => Promise<EventFormState>;
  event?: EventFull;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [tab, setTab] = useState<Locale>("en");
  const [preview, setPreview] = useState<string>(event?.cover ?? "");
  const fe = state?.fieldErrors ?? {};

  return (
    <form action={formAction} className="grid max-w-[920px] gap-8">
      {event && <input type="hidden" name="id" value={event.id} />}
      <input type="hidden" name="cover_current" value={event?.cover ?? ""} />

      {state?.error && <div role="alert" className="rounded-xl border border-[#5a2a2a] bg-[#2a1515] p-4 text-[#FFB4A8]">{state.error}</div>}
      {state?.saved && <div role="status" className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-accent">Saved. The website is updated.</div>}

      {/* ---- texts per language ---- */}
      <fieldset className="rounded-2xl border border-line-2 p-5">
        <legend className="px-2 font-display text-lg">Content</legend>
        <p className="mt-0 mb-4 text-sm text-dim">Fill English and Thai at least. Empty languages fall back to English on the website.</p>
        <div role="tablist" className="mb-5 flex flex-wrap gap-1">
          {locales.map((l) => {
            const filled = !!event?.texts[l]?.title;
            return (
              <button
                key={l}
                type="button"
                role="tab"
                aria-selected={tab === l}
                onClick={() => setTab(l)}
                className={`rounded-lg px-3 py-2 text-sm ${tab === l ? "bg-accent font-semibold text-ink" : "border border-edge text-soft"}`}
              >
                {localeMeta[l].label} {filled ? "●" : ""}
              </button>
            );
          })}
        </div>
        {locales.map((l) => {
          const t = event?.texts[l];
          return (
            <div key={l} role="tabpanel" hidden={tab !== l} dir={localeMeta[l].dir} lang={l} className="grid gap-4">
              <div>
                <label className={label} htmlFor={`title_${l}`}>Title ({localeMeta[l].name}){l === "en" ? " *" : ""}</label>
                <input id={`title_${l}`} name={`title_${l}`} defaultValue={t?.title} className="field" />
                {l === "en" && <Err msg={fe.title_en} />}
              </div>
              <div>
                <label className={label} htmlFor={`summary_${l}`}>Short summary (cards & search results)</label>
                <textarea id={`summary_${l}`} name={`summary_${l}`} defaultValue={t?.summary} rows={2} className="field" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor={`venue_${l}`}>Venue</label>
                  <input id={`venue_${l}`} name={`venue_${l}`} defaultValue={t?.venue} className="field" />
                </div>
                <div>
                  <label className={label} htmlFor={`audience_${l}`}>Who it is for</label>
                  <input id={`audience_${l}`} name={`audience_${l}`} defaultValue={t?.audience} className="field" />
                </div>
              </div>
              <div>
                <label className={label} htmlFor={`body_${l}`}>Full description / agenda</label>
                <textarea id={`body_${l}`} name={`body_${l}`} defaultValue={t?.body} rows={8} className="field" />
              </div>
            </div>
          );
        })}
      </fieldset>

      {/* ---- schedule & settings ---- */}
      <fieldset className="grid gap-4 rounded-2xl border border-line-2 p-5 sm:grid-cols-2">
        <legend className="px-2 font-display text-lg">Schedule & settings</legend>
        <div>
          <label className={label} htmlFor="starts_at">Starts (Bangkok time)</label>
          <input id="starts_at" name="starts_at" type="datetime-local" defaultValue={toLocal(event?.starts_at ?? null)} className="field [color-scheme:dark]" />
        </div>
        <div>
          <label className={label} htmlFor="ends_at">Ends (optional)</label>
          <input id="ends_at" name="ends_at" type="datetime-local" defaultValue={toLocal(event?.ends_at ?? null)} className="field [color-scheme:dark]" />
          <Err msg={fe.ends_at} />
        </div>
        <div>
          <label className={label} htmlFor="type">Type</label>
          <select id="type" name="type" defaultValue={event?.type ?? "SEMINAR"} className="field">
            {TYPES.map((x) => <option key={x} value={x}>{x.replace("_", " ").toLowerCase()}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="mode">Format</label>
          <select id="mode" name="mode" defaultValue={event?.mode ?? "IN_PERSON"} className="field">
            {MODES.map(([v, n]) => <option key={v} value={v}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="client">Client / brand</label>
          <input id="client" name="client" defaultValue={event?.client} className="field" />
        </div>
        <div>
          <label className={label} htmlFor="year">Year (only if there is no exact date)</label>
          <input id="year" name="year" inputMode="numeric" defaultValue={event?.starts_at ? "" : event?.year ?? ""} className="field" />
          <Err msg={fe.year} />
        </div>
        <div>
          <label className={label} htmlFor="capacity">Seat limit (empty = unlimited)</label>
          <input id="capacity" name="capacity" inputMode="numeric" defaultValue={event?.capacity ?? ""} className="field" />
          <Err msg={fe.capacity} />
        </div>
        <div>
          <label className={label} htmlFor="slug">Web address</label>
          <div className="flex items-center gap-2"><span className="font-mono text-sm text-dim">/events/</span><input id="slug" name="slug" defaultValue={event?.slug} placeholder="auto from English title" className="field" /></div>
          <Err msg={fe.slug} />
        </div>
        <div className="flex flex-col gap-3 sm:col-span-2">
          <label className="flex items-center gap-3"><input type="checkbox" name="registration_open" defaultChecked={event ? !!event.registration_open : true} className="h-5 w-5 accent-[#C6F432]" /> Registration open</label>
          <label className="flex items-center gap-3"><input type="checkbox" name="featured" defaultChecked={!!event?.featured} className="h-5 w-5 accent-[#C6F432]" /> Feature on the home page (replaces the current featured event)</label>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-soft">Status</span>
            <label className="flex items-center gap-2"><input type="radio" name="status" value="draft" defaultChecked={event?.status !== "published"} className="accent-[#C6F432]" /> Draft (hidden)</label>
            <label className="flex items-center gap-2"><input type="radio" name="status" value="published" defaultChecked={event?.status === "published"} className="accent-[#C6F432]" /> Published</label>
          </div>
        </div>
      </fieldset>

      {/* ---- cover ---- */}
      <fieldset className="rounded-2xl border border-line-2 p-5">
        <legend className="px-2 font-display text-lg">Cover photo</legend>
        <div className="flex flex-wrap items-start gap-5">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Cover preview" className="h-40 w-64 rounded-xl object-cover" />
          ) : (
            <div className="ph flex h-40 w-64 items-center justify-center rounded-xl text-sm text-dim">No cover</div>
          )}
          <div className="grid gap-3">
            <label className={label} htmlFor="cover_file">Upload JPG, PNG or WebP (max 8 MB, landscape works best)</label>
            <input
              id="cover_file"
              name="cover_file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="text-sm"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />
            <Err msg={fe.cover} />
            {event?.cover && (
              <label className="flex items-center gap-2 text-sm text-soft"><input type="checkbox" name="cover_remove" className="accent-[#C6F432]" /> Remove current cover</label>
            )}
          </div>
        </div>
      </fieldset>

      <input type="hidden" name="sort" value={event?.sort ?? 0} />
      <div className="flex gap-3">
        <button type="submit" disabled={pending} className="rounded-full bg-accent px-8 py-3.5 font-semibold text-ink disabled:opacity-60">
          {pending ? "Saving…" : event ? "Save changes" : "Create event"}
        </button>
      </div>
    </form>
  );
}
