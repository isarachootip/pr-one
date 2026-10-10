"use client";

import { useState } from "react";
import { FieldError } from "./ui";

export function RegisterForm({ eventSlug }: { eventSlug: string }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, eventSlug }) });
    const data = await res.json().catch(() => ({}));
    if (res.ok) setState("done");
    else {
      setErrors(data.errors ?? {});
      setState(data.errors ? "idle" : "error");
    }
  }

  if (state === "done")
    return (
      <div className="rounded-[22px] border border-accent bg-panel p-8" role="status">
        <div className="mb-2 font-mono text-[13px] tracking-[0.08em] text-accent">● SEAT RESERVED</div>
        <h2 className="mb-2 font-display text-[32px]">You’re registered, {form.firstName}.</h2>
        <p className="m-0 text-muted">A confirmation and venue details will be sent to {form.email}. Add us on LINE for day-of reminders.</p>
      </div>
    );

  const label = "mb-2 block text-sm text-soft";
  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-[22px] border border-line-2 bg-panel p-8">
      <h2 className="m-0 font-display text-[28px] tracking-[-0.02em]">Reserve your seat</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="r-fn" className={label}>First name *</label><input id="r-fn" className="field" value={form.firstName} onChange={set("firstName")} autoComplete="given-name" /><FieldError msg={errors.firstName} /></div>
        <div><label htmlFor="r-ln" className={label}>Last name *</label><input id="r-ln" className="field" value={form.lastName} onChange={set("lastName")} autoComplete="family-name" /><FieldError msg={errors.lastName} /></div>
        <div><label htmlFor="r-em" className={label}>Work email *</label><input id="r-em" type="email" className="field" value={form.email} onChange={set("email")} autoComplete="email" /><FieldError msg={errors.email} /></div>
        <div><label htmlFor="r-ph" className={label}>Mobile</label><input id="r-ph" type="tel" className="field" value={form.phone} onChange={set("phone")} autoComplete="tel" /></div>
        <div><label htmlFor="r-co" className={label}>Company *</label><input id="r-co" className="field" value={form.company} onChange={set("company")} autoComplete="organization" /><FieldError msg={errors.company} /></div>
        <div><label htmlFor="r-jt" className={label}>Job title</label><input id="r-jt" className="field" value={form.jobTitle} onChange={set("jobTitle")} autoComplete="organization-title" /></div>
      </div>
      <div>
        <label className="flex items-start gap-3 text-[15px] text-muted">
          <input type="checkbox" checked={form.consent} onChange={set("consent")} className="mt-1 h-5 w-5 accent-[#C6F432]" />
          I agree that PR One and the event organiser may contact me about this event, in line with Thailand’s PDPA.
        </label>
        <FieldError msg={errors.consent} />
      </div>
      {state === "error" && <p className="m-0 text-[#FF9C8A]">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={state === "sending"} className="rounded-xl bg-accent p-4 text-[17px] font-semibold text-ink disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Register free"}
      </button>
    </form>
  );
}
