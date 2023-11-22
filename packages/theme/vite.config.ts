import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const serverUrl = env.APP_SERVER_URL || "http://localhost:3000";
  console.log(serverUrl)
  return {
    plugins: [vue()],
    server: {
      port: 9090,
      proxy: {
        "/api": {
          target: serverUrl,
        },
      },
    },
    build: {
      outDir: "./dist",
    },
  };
});
