import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  let basePath = "/";
  if (env.VITE_APP_ENV === "staging") {
    basePath = "/note-pyramid-staging";
  } else if (env.VITE_APP_ENV === "production") {
    basePath = "/note-pyramid-prod";
  }

  return {
    base: basePath,
    plugins: [
      react({
        babel: {
          plugins: [
            [
              "babel-plugin-styled-components",
              { displayName: true, fileName: true },
            ],
          ],
        },
      }),
    ],
  };
});
