"use client";

import { useState } from "react";
import { fmt, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import { FieldError } from "./ui";
import { useSubmit } from "./useSubmit";

export function ContactForm({ lang, t }: { lang: Locale; t: Dict }) {
  const c = t.contact;
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", eventType: c.eventTypes[0], eventDate: "", audience: c.audiences[1], message: "", website: "" });
  const { state, errors, errorMsg, submit } = useSubmit("/api/contact", t.form);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (state === "done")
    return (
      <div className="rounded-[22px] border border-accent bg-panel p-8" role="status">
        <div className="mb-2 font-mono text-[13px] tracking-[0.08em] text-accent">{c.receivedTag}</div>
        <h3 className="mb-2 font-display text-[28px]">{fmt(c.thanks, { name: form.name.split(" ")[0] })}</h3>
        <p className="m-0 text-muted">{fmt(c.thanksBody, { email: form.email })}</p>
      </div>
    );

  const label = "mb-2 block text-sm text-soft";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit({ ...form, locale: lang });
      }}
      noValidate
      className="grid gap-5 rounded-[22px] border border-line-2 bg-panel p-6 sm:p-8"
    >
      <h3 className="m-0 font-display text-[28px] tracking-[-0.02em]">{c.formTitle}</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="c-name" className={label}>{c.name} *</label><input id="c-name" className="field" value={form.name} onChange={set("name")} autoComplete="name" /><FieldError msg={errors.name} /></div>
        <div><label htmlFor="c-company" className={label}>{c.company}</label><input id="c-company" className="field" value={form.company} onChange={set("company")} autoComplete="organization" /></div>
        <div><label htmlFor="c-email" className={label}>{c.email} *</label><input id="c-email" type="email" dir="ltr" className="field" value={form.email} onChange={set("email")} autoComplete="email" /><FieldError msg={errors.email} /></div>
        <div><label htmlFor="c-phone" className={label}>{c.phone}</label><input id="c-phone" type="tel" dir="ltr" className="field" value={form.phone} onChange={set("phone")} autoComplete="tel" /></div>
        <div><label htmlFor="c-type" className={label}>{c.eventType}</label>
          <select id="c-type" className="field" value={form.eventType} onChange={set("eventType")}>{c.eventTypes.map((x) => <option key={x}>{x}</option>)}</select></div>
        <div><label htmlFor="c-aud" className={label}>{c.audience}</label>
          <select id="c-aud" className="field" value={form.audience} onChange={set("audience")}>{c.audiences.map((x) => <option key={x}>{x}</option>)}</select></div>
        <div className="sm:col-span-2"><label htmlFor="c-date" className={label}>{c.date}</label><input id="c-date" type="date" className="field [color-scheme:dark]" value={form.eventDate} onChange={set("eventDate")} /></div>
        <div className="sm:col-span-2"><label htmlFor="c-msg" className={label}>{c.message} *</label>
          <textarea id="c-msg" rows={5} className="field" value={form.message} onChange={set("message")} placeholder={c.messagePh} /><FieldError msg={errors.message} /></div>
        <div className="hidden" aria-hidden="true"><label htmlFor="c-web">Website</label><input id="c-web" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} /></div>
      </div>
      <FieldError msg={errorMsg} />
      <button type="submit" disabled={state === "sending"} className="justify-self-start rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-ink disabled:opacity-60">
        {state === "sending" ? t.form.sending : c.send}
      </button>
    </form>
  );
}
