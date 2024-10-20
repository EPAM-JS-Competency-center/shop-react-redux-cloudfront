/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  build: {
    outDir: "./infra/resources/build",
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
