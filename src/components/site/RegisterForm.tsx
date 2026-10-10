"use client";

import { useState } from "react";
import { fmt, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import { FieldError } from "./ui";
import { useSubmit } from "./useSubmit";

export function RegisterForm({ slug, lang, t }: { slug: string; lang: Locale; t: Dict }) {
  const r = t.register;
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "", consent: false, website: "" });
  const { state, errors, errorMsg, submit } = useSubmit("/api/register", t.form, { already: r.already, closed: r.closed, full: r.full });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  if (state === "done")
    return (
      <div className="rounded-[22px] border border-accent bg-panel p-8" role="status">
        <div className="mb-2 font-mono text-[13px] tracking-[0.08em] text-accent">● {r.doneTag}</div>
        <h2 className="mb-2 font-display text-[32px]">{fmt(r.doneTitle, { name: form.firstName })}</h2>
        <p className="m-0 text-muted">{fmt(r.doneBody, { email: form.email })}</p>
      </div>
    );

  const label = "mb-2 block text-sm text-soft";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit({ ...form, slug, locale: lang });
      }}
      noValidate
      className="grid gap-5 rounded-[22px] border border-line-2 bg-panel p-6 sm:p-8"
    >
      <h2 className="m-0 font-display text-[28px] tracking-[-0.02em]">{r.title}</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="r-fn" className={label}>{r.firstName} *</label><input id="r-fn" className="field" value={form.firstName} onChange={set("firstName")} autoComplete="given-name" /><FieldError msg={errors.firstName} /></div>
        <div><label htmlFor="r-ln" className={label}>{r.lastName} *</label><input id="r-ln" className="field" value={form.lastName} onChange={set("lastName")} autoComplete="family-name" /><FieldError msg={errors.lastName} /></div>
        <div><label htmlFor="r-em" className={label}>{r.email} *</label><input id="r-em" type="email" dir="ltr" className="field" value={form.email} onChange={set("email")} autoComplete="email" /><FieldError msg={errors.email} /></div>
        <div><label htmlFor="r-ph" className={label}>{r.mobile}</label><input id="r-ph" type="tel" dir="ltr" className="field" value={form.phone} onChange={set("phone")} autoComplete="tel" /></div>
        <div><label htmlFor="r-co" className={label}>{r.company} *</label><input id="r-co" className="field" value={form.company} onChange={set("company")} autoComplete="organization" /><FieldError msg={errors.company} /></div>
        <div><label htmlFor="r-jt" className={label}>{r.jobTitle}</label><input id="r-jt" className="field" value={form.jobTitle} onChange={set("jobTitle")} autoComplete="organization-title" /></div>
        <div className="hidden" aria-hidden="true"><label htmlFor="r-web">Website</label><input id="r-web" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} /></div>
      </div>
      <div>
        <label className="flex items-start gap-3 text-[15px] text-muted">
          <input type="checkbox" checked={form.consent} onChange={set("consent")} className="mt-1 h-5 w-5 shrink-0 accent-[#C6F432]" />
          {r.consent}
        </label>
        <FieldError msg={errors.consent} />
      </div>
      <FieldError msg={errorMsg} />
      <button type="submit" disabled={state === "sending"} className="rounded-xl bg-accent p-4 text-[17px] font-semibold text-ink disabled:opacity-60">
        {state === "sending" ? t.form.sending : r.submit}
      </button>
    </form>
  );
}
