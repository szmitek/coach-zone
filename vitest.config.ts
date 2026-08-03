import path from "node:path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    // e2e/**/*.spec.ts matches Vitest's default *.spec.ts glob, but those
    // files use @playwright/test's own `test`/`expect` and only run under
    // the Playwright runner (`pnpm test:e2e`) - Vitest picking them up too
    // fails immediately since Playwright's test.skip() etc. need Playwright's
    // own runner context.
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
});
