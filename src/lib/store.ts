import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

// Simple JSON-file storage. On Coolify, mount a persistent volume at DATA_DIR
// so submissions survive redeploys. Swap for a database later if needed.

export type Collection = "registrations" | "contacts" | "subscribers";

const dataDir = () => path.resolve(process.env.DATA_DIR || path.join(process.cwd(), "data"));
const fileOf = (c: Collection) => path.join(dataDir(), `${c}.json`);

let queue: Promise<unknown> = Promise.resolve();

export async function readAll<T = Record<string, unknown>>(c: Collection): Promise<(T & { id: string; createdAt: string })[]> {
  try {
    const raw = await fs.readFile(fileOf(c), "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function append<T extends Record<string, unknown>>(c: Collection, record: T) {
  const job = queue.then(async () => {
    await fs.mkdir(dataDir(), { recursive: true });
    const all = await readAll(c);
    const row = { id: randomUUID(), createdAt: new Date().toISOString(), ...record };
    all.push(row);
    await fs.writeFile(fileOf(c), JSON.stringify(all, null, 2), "utf8");
    return row;
  });
  queue = job.catch(() => undefined);
  return job;
}

// --- validation helpers ---
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function clean(v: unknown, max = 300): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function isEmail(v: string) {
  return EMAIL.test(v);
}
