import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "redpeptide",
    workersDev: true,
    domains: ["novion.ch", "www.novion.ch"],
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-23",
    compatibilityFlags: ["nodejs_compat"],
    observability: {
      enabled: true,
      logs: { headSamplingRate: 1 },
      traces: { enabled: true, headSamplingRate: 1 },
    },
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      CATALOG: bindings.kv(),
    },
  }),
});
