import { requireCatalogEditor } from "@/lib/admin-auth";
import { saveMedia } from "@/lib/media";

export async function POST(request: Request) {
  const editor = await requireCatalogEditor(request);
  if (!editor.ok) return Response.json({ message: editor.message }, { status: editor.status });

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return Response.json({ message: "Choose a photograph." }, { status: 400 });
  const saved = await saveMedia(new Uint8Array(await file.arrayBuffer()));
  if ("error" in saved) return Response.json({ message: saved.error }, { status: 400 });
  return Response.json({ url: saved.url });
}
