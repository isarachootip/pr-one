"use client";

import { useState } from "react";
import { FieldError } from "./ui";

const eventTypes = ["Seminar / Summit", "Product launch", "Exhibition / Trade fair", "Press conference / PR", "Customer event", "Roadshow", "Other"];
const audiences = ["Under 100", "100–300", "300–1,000", "1,000+"];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", eventType: eventTypes[0], eventDate: "", audience: audiences[1], message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
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
        <div className="mb-2 font-mono text-[13px] tracking-[0.08em] text-accent">REQUEST RECEIVED</div>
        <h3 className="mb-2 font-display text-[28px]">Thanks, {form.name.split(" ")[0]}.</h3>
        <p className="m-0 text-muted">Our events team will get back to you at {form.email} with a plan and budget.</p>
      </div>
    );

  const label = "mb-2 block text-sm text-soft";
  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-[22px] border border-line-2 bg-panel p-8">
      <h3 className="m-0 font-display text-[28px] tracking-[-0.02em]">Request a proposal</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="c-name" className={label}>Your name *</label><input id="c-name" className="field" value={form.name} onChange={set("name")} /><FieldError msg={errors.name} /></div>
        <div><label htmlFor="c-company" className={label}>Company</label><input id="c-company" className="field" value={form.company} onChange={set("company")} /></div>
        <div><label htmlFor="c-email" className={label}>Work email *</label><input id="c-email" type="email" className="field" value={form.email} onChange={set("email")} /><FieldError msg={errors.email} /></div>
        <div><label htmlFor="c-phone" className={label}>Phone</label><input id="c-phone" type="tel" className="field" value={form.phone} onChange={set("phone")} /></div>
        <div><label htmlFor="c-type" className={label}>Event type</label>
          <select id="c-type" className="field" value={form.eventType} onChange={set("eventType")}>{eventTypes.map((t) => <option key={t}>{t}</option>)}</select></div>
        <div><label htmlFor="c-aud" className={label}>Expected attendees</label>
          <select id="c-aud" className="field" value={form.audience} onChange={set("audience")}>{audiences.map((t) => <option key={t}>{t}</option>)}</select></div>
        <div className="sm:col-span-2"><label htmlFor="c-date" className={label}>Target date</label><input id="c-date" type="date" className="field [color-scheme:dark]" value={form.eventDate} onChange={set("eventDate")} /></div>
        <div className="sm:col-span-2"><label htmlFor="c-msg" className={label}>About your event *</label>
          <textarea id="c-msg" rows={5} className="field" value={form.message} onChange={set("message")} placeholder="Audience, goals, city, budget range…" /><FieldError msg={errors.message} /></div>
      </div>
      {state === "error" && <p className="m-0 text-[#FF9C8A]">Something went wrong. Please try again or call us.</p>}
      <button type="submit" disabled={state === "sending"} className="justify-self-start rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-ink disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
