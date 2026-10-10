"use client";

import { useState } from "react";
import type { Dict } from "@/i18n/dictionaries/en";

/** POST JSON to an API route and map server error codes to translated messages. */
export function useSubmit(url: string, tf: Dict["form"], extra?: Record<string, string>) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");

  async function submit(body: Record<string, unknown>) {
    setState("sending");
    setErrors({});
    setErrorMsg("");
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) return setState("done");
      const map: Record<string, string> = { required: tf.required, email: tf.email, consent: tf.consent, ...extra };
      const errs: Record<string, string> = {};
      for (const [k, code] of Object.entries((data.errors ?? {}) as Record<string, string>)) errs[k] = map[code] ?? tf.generic;
      setErrors(errs);
      if (data.error) setErrorMsg(map[data.error] ?? tf.generic);
      else if (!Object.keys(errs).length) setErrorMsg(tf.generic);
      setState("idle");
    } catch {
      setErrorMsg(tf.generic);
      setState("idle");
    }
  }
  return { state, errors, errorMsg, submit };
}
