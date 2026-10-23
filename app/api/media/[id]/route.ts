import { readMedia } from "@/lib/media";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const media = await readMedia(id);
  if (!media) return new Response("Not found", { status: 404 });
  const bytes = new Uint8Array(media.bytes.byteLength);
  bytes.set(media.bytes);
  return new Response(bytes, {
    headers: {
      "Content-Type": media.type,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
