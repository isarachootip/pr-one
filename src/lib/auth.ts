// Signed session cookie for the admin area. Works in middleware (edge) and Node.
export const SESSION_COOKIE = "pr1_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

const enc = new TextEncoder();
const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function secret() {
  const s = process.env.ADMIN_SECRET || (process.env.ADMIN_PASSWORD ? "pr1:" + process.env.ADMIN_PASSWORD : "");
  return s;
}

async function hmac(data: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

export async function createSession(user: string) {
  const payload = b64url(enc.encode(JSON.stringify({ u: user, exp: Math.floor(Date.now() / 1000) + MAX_AGE })));
  return { value: `${payload}.${await hmac(payload)}`, maxAge: MAX_AGE };
}

export async function verifySession(token: string | undefined | null): Promise<string | null> {
  if (!token || !secret()) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = await hmac(payload);
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return null;
  try {
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    if (typeof json.exp !== "number" || json.exp < Date.now() / 1000) return null;
    return String(json.u);
  } catch {
    return null;
  }
}

/** Constant-time check of the login form against ADMIN_USER / ADMIN_PASSWORD. */
export function checkCredentials(user: string, pass: string) {
  const U = process.env.ADMIN_USER || "admin";
  const P = process.env.ADMIN_PASSWORD || "";
  if (!P) return false;
  const a = `${user}\u0000${pass}`;
  const b = `${U}\u0000${P}`;
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}
