"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/en";
import { FieldError } from "./ui";
import { useSubmit } from "./useSubmit";

export function SubscribeForm({ lang, t }: { lang: Locale; t: Dict }) {
  const [email, setEmail] = useState("");
  const { state, errors, errorMsg, submit } = useSubmit("/api/subscribe", t.form);
  const c = t.connect;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit({ email, locale: lang });
      }}
      noValidate
      className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-4 rounded-[22px] border border-line-2 bg-panel px-6 py-7 sm:px-8"
    >
      <div className="flex-[1_1_280px]">
        <h3 className="mb-1.5 font-display text-2xl">{c.newsletterTitle}</h3>
        <p className="m-0 text-muted-2">{c.newsletterBody}</p>
      </div>
      <div className="flex flex-[1_1_320px] flex-col gap-2">
        {state === "done" ? (
          <p className="m-0 text-lg font-semibold text-accent" role="status">
            {c.subscribed}
          </p>
        ) : (
          <>
            <label htmlFor="sub-email" className="text-sm text-soft">
              {c.workEmail}
            </label>
            <div className="flex flex-wrap gap-2.5">
              <input id="sub-email" type="email" dir="ltr" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="field flex-[1_1_200px]" />
              <button type="submit" disabled={state === "sending"} className="rounded-xl bg-accent px-[22px] py-3.5 text-base font-semibold text-ink disabled:opacity-60">
                {state === "sending" ? t.form.sending : c.subscribe}
              </button>
            </div>
            <FieldError msg={errors.email || errorMsg} />
          </>
        )}
      </div>
    </form>
  );
}
