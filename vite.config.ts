import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg}"], // Files to cache
      },
      manifest: {
        name: "Shop.co",
        short_name: "Shop",
        icons: [
          {
            src: "./icons/icon65.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "./icons/icon-100.png",
            sizes: "100x100",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "fullscreen",
        theme_color: "#ffffff",
        background_color: "#678924",
        shortcuts: [
          {
            name: "Men Shirt",
            short_name: "Men shirt",
            description: "Men Collections",
            url: "/product/category/male",
            icons: [
              {
                src: "/icons/icon-jacket.png",
                sizes: "100x100",
                type: "image/png",
              },
            ],
          },
        ],
      },
    }),
  ],
});
