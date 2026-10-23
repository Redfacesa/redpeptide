declare module "cloudflare:workers" {
  export const env: {
    CATALOG?: {
      get: (key: string) => Promise<string | null>;
      put: (key: string, value: string) => Promise<void>;
    };
  };
}
