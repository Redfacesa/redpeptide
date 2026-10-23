import { readStore, writeStore } from "@/lib/storage";

const MAX_BYTES = 4 * 1024 * 1024;

export function mediaIdOk(id: string) {
  return /^[a-f0-9-]+\.(jpe?g|png|webp)$/i.test(id);
}

function sniff(bytes: Uint8Array): { ext: "jpg" | "png" | "webp"; type: string } | null {
  if (bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: "jpg", type: "image/jpeg" };
  }
  if (bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { ext: "png", type: "image/png" };
  }
  if (
    bytes.length > 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { ext: "webp", type: "image/webp" };
  }
  return null;
}

export async function saveMedia(bytes: Uint8Array): Promise<{ url: string } | { error: string }> {
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_BYTES) {
    return { error: "Use a JPEG, PNG, or WebP under 4 MB." };
  }
  const kind = sniff(bytes);
  if (!kind) return { error: "Use a JPEG, PNG, or WebP photograph." };
  const id = `${crypto.randomUUID()}.${kind.ext}`;
  const body = JSON.stringify({ type: kind.type, body: Buffer.from(bytes).toString("base64") });
  const saved = await writeStore(`media:${id}`, `.data/media/${id}.json`, body);
  if (!saved) return { error: "The photograph could not be stored." };
  return { url: `/api/media/${id}` };
}

export async function readMedia(id: string): Promise<{ type: string; bytes: Uint8Array } | null> {
  if (!mediaIdOk(id)) return null;
  const raw = await readStore(`media:${id}`, `.data/media/${id}.json`);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { type?: string; body?: string };
    if (!parsed.type || !parsed.body) return null;
    return { type: parsed.type, bytes: Buffer.from(parsed.body, "base64") };
  } catch {
    return null;
  }
}
