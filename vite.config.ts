import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@src", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      {
        find: "@routers",
        replacement: resolve(__dirname, "src/routers"),
      },
      {
        find: "@styles",
        replacement: resolve(__dirname, "src/styles"),
      },
      {
        find: "@interface",
        replacement: resolve(__dirname, "src/apis/interfaces"),
      },
      {
        find: "@utils",
        replacement: resolve(__dirname, "src/utils"),
      },
    ],
  },
  plugins: [react(), tsconfigPaths()],
});
