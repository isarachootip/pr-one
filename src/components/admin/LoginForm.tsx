"use client";

import { useActionState } from "react";
import { login } from "@/app/(admin)/admin/actions";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="grid gap-4 rounded-[20px] border border-line-2 bg-panel p-7">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="u" className="mb-2 block text-sm text-soft">Username</label>
        <input id="u" name="username" autoComplete="username" required className="field" defaultValue={state?.username ?? "admin"} key={state?.username} />
      </div>
      <div>
        <label htmlFor="p" className="mb-2 block text-sm text-soft">Password</label>
        <input id="p" name="password" type="password" autoComplete="current-password" required className="field" />
      </div>
      {state?.error && <p role="alert" className="m-0 text-sm text-[#FF9C8A]">{state.error}</p>}
      <button type="submit" disabled={pending} className="rounded-xl bg-accent p-3.5 font-semibold text-ink disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
