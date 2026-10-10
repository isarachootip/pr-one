"use client";

import { useState } from "react";
import { FieldError } from "./ui";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState<string>();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setErr(undefined);
    const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await res.json().catch(() => ({}));
    if (res.ok) setState("done");
    else {
      setErr(data.errors?.email ?? "Something went wrong, please try again.");
      setState("idle");
    }
  }

  return (
    <form onSubmit={submit} className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-4 rounded-[22px] border border-line-2 bg-panel px-8 py-7">
      <div className="flex-[1_1_280px]">
        <h3 className="mb-1.5 font-display text-2xl">Monthly event calendar by email</h3>
        <p className="m-0 text-muted-2">One email a month. Unsubscribe anytime.</p>
      </div>
      <div className="flex flex-[1_1_320px] flex-col gap-2">
        {state === "done" ? (
          <p className="m-0 text-lg font-semibold text-accent" role="status">You’re on the list. See you at the next event.</p>
        ) : (
          <>
            <label htmlFor="sub-email" className="text-sm text-soft">Work email</label>
            <div className="flex flex-wrap gap-2.5">
              <input id="sub-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="field flex-[1_1_200px]" />
              <button type="submit" disabled={state === "sending"} className="rounded-xl bg-accent px-[22px] py-3.5 text-base font-semibold text-ink disabled:opacity-60">
                {state === "sending" ? "Sending…" : "Subscribe"}
              </button>
            </div>
            <FieldError msg={err} />
          </>
        )}
      </div>
    </form>
  );
}
