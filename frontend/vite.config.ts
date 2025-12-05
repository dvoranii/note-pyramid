import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_APP_ENV === "staging" ? "/note-pyramid" : "/",
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
