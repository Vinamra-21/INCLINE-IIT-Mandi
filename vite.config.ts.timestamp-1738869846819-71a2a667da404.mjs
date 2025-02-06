// vite.config.ts
import { defineConfig } from "file:///E:/Web%20Development/Projects-IIT/Incline%20IIT%20Mandi/incline/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///E:/Web%20Development/Projects-IIT/Incline%20IIT%20Mandi/incline/node_modules/@tailwindcss/vite/dist/index.mjs";
import { reactRouter } from "file:///E:/Web%20Development/Projects-IIT/Incline%20IIT%20Mandi/incline/node_modules/@react-router/dev/dist/vite.js";
import tsconfigPaths from "file:///E:/Web%20Development/Projects-IIT/Incline%20IIT%20Mandi/incline/node_modules/vite-tsconfig-paths/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    fs: {
      strict: false
      // Helps avoid file limit errors
    }
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
    exclude: ["lucide-react"]
    // Prevents excessive file handling
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXZWIgRGV2ZWxvcG1lbnRcXFxcUHJvamVjdHMtSUlUXFxcXEluY2xpbmUgSUlUIE1hbmRpXFxcXGluY2xpbmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFdlYiBEZXZlbG9wbWVudFxcXFxQcm9qZWN0cy1JSVRcXFxcSW5jbGluZSBJSVQgTWFuZGlcXFxcaW5jbGluZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovV2ViJTIwRGV2ZWxvcG1lbnQvUHJvamVjdHMtSUlUL0luY2xpbmUlMjBJSVQlMjBNYW5kaS9pbmNsaW5lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIjtcbmltcG9ydCB7IHJlYWN0Um91dGVyIH0gZnJvbSBcIkByZWFjdC1yb3V0ZXIvZGV2L3ZpdGVcIjtcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt0YWlsd2luZGNzcygpLCByZWFjdFJvdXRlcigpLCB0c2NvbmZpZ1BhdGhzKCldLFxuICBzZXJ2ZXI6IHtcbiAgICBmczoge1xuICAgICAgc3RyaWN0OiBmYWxzZSwgLy8gSGVscHMgYXZvaWQgZmlsZSBsaW1pdCBlcnJvcnNcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcbiAgICBleGNsdWRlOiBbXCJsdWNpZGUtcmVhY3RcIl0sIC8vIFByZXZlbnRzIGV4Y2Vzc2l2ZSBmaWxlIGhhbmRsaW5nXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZXLFNBQVMsb0JBQW9CO0FBQzFZLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsbUJBQW1CO0FBQzVCLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsWUFBWSxHQUFHLGNBQWMsQ0FBQztBQUFBLEVBQ3ZELFFBQVE7QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsU0FBUyxXQUFXO0FBQUEsSUFDOUIsU0FBUyxDQUFDLGNBQWM7QUFBQTtBQUFBLEVBQzFCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixhQUFhLElBQUk7QUFDZixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
