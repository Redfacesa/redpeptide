type Kv = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
};

async function kv(): Promise<Kv | null> {
  try {
    const { env } = await import(/* webpackIgnore: true */ "cloudflare:workers");
    return (env as { CATALOG?: Kv }).CATALOG ?? null;
  } catch {
    return null;
  }
}

export async function readStore(key: string, file: string): Promise<string | null> {
  const store = await kv();
  if (store) return store.get(key);
  try {
    const { readFile } = await import("node:fs/promises");
    return await readFile(file, "utf8");
  } catch {
    return null;
  }
}

export async function writeStore(key: string, file: string, value: string): Promise<"kv" | "file" | null> {
  const store = await kv();
  if (store) {
    await store.put(key, value);
    return "kv";
  }
  try {
    const { mkdir, writeFile } = await import("node:fs/promises");
    const { dirname } = await import("node:path");
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, value);
    return "file";
  } catch {
    return null;
  }
}
