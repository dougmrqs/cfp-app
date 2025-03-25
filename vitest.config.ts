import { defineConfig } from 'vitest/config';
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    fileParallelism: false,
    include: ["test/**/*.test.ts"],
  },
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src")
    }
  }
});
