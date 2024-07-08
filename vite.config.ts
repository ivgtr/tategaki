import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // baseプロパティに設定する値
  let base = "/";

  // 本番時に適用させるbaseの値
  if (mode === "production") {
    base = "/tategaki/";
  }

  return {
    plugins: [react()],
    // baseプロパティをbase変数で指定
    base: base,
  };
});
