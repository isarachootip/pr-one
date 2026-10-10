import { promises as fs } from "fs";
import path from "path";
import { uploadsDir } from "@/lib/db";

const TYPES: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

// Serves images uploaded from the admin area (stored in DATA_DIR/uploads).
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!/^[a-f0-9-]{36}\.(jpg|jpeg|png|webp)$/.test(file)) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(path.join(uploadsDir(), file));
    return new Response(new Uint8Array(data), {
      headers: { "Content-Type": TYPES[path.extname(file)], "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
