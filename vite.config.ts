import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: ["react-leaflet", "leaflet"],
  },
  optimizeDeps: {
    include: ["leaflet", "react-leaflet"],
    exclude: ["lucide-react"],
  },
  build: {
    rollupOptions: {
      external: ["react-google-recaptcha"],
      output: {
        manualChunks: (id) => {
          if (id.includes("lucide-react")) return "lucide";
        },
      },
    },
  },
});
