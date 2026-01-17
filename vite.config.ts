import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "prompt", // Hiện thông báo khi có bản cập nhật mới
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,jpg}"], // Lưu mọi file vào bộ nhớ đệm để chạy offline
      },
      manifest: {
        name: "Học Danh Pháp Hữu Cơ 12",
        short_name: "HóaHữuCơ12",
        description: "Ứng dụng học danh pháp hóa học hữu cơ lớp 12",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
