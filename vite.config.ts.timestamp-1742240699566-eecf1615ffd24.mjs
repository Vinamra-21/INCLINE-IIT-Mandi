// vite.config.ts
import { reactRouter } from "file:///E:/Web%20Development/Projects-IIT/Incline%20IIT%20Mandi/incline/node_modules/@react-router/dev/dist/vite.js";
import tailwindcss from "file:///E:/Web%20Development/Projects-IIT/Incline%20IIT%20Mandi/incline/node_modules/@tailwindcss/vite/dist/index.mjs";
import { defineConfig } from "file:///E:/Web%20Development/Projects-IIT/Incline%20IIT%20Mandi/incline/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///E:/Web%20Development/Projects-IIT/Incline%20IIT%20Mandi/incline/node_modules/vite-tsconfig-paths/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: ["react-leaflet", "leaflet"]
  },
  optimizeDeps: {
    include: ["leaflet", "react-leaflet"],
    exclude: ["lucide-react"]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("lucide-react")) return "lucide";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXZWIgRGV2ZWxvcG1lbnRcXFxcUHJvamVjdHMtSUlUXFxcXEluY2xpbmUgSUlUIE1hbmRpXFxcXGluY2xpbmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFdlYiBEZXZlbG9wbWVudFxcXFxQcm9qZWN0cy1JSVRcXFxcSW5jbGluZSBJSVQgTWFuZGlcXFxcaW5jbGluZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovV2ViJTIwRGV2ZWxvcG1lbnQvUHJvamVjdHMtSUlUL0luY2xpbmUlMjBJSVQlMjBNYW5kaS9pbmNsaW5lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVhY3RSb3V0ZXIgfSBmcm9tIFwiQHJlYWN0LXJvdXRlci9kZXYvdml0ZVwiO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdGFpbHdpbmRjc3Mvdml0ZVwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt0YWlsd2luZGNzcygpLCByZWFjdFJvdXRlcigpLCB0c2NvbmZpZ1BhdGhzKCldLFxuICBzc3I6IHtcbiAgICBub0V4dGVybmFsOiBbXCJyZWFjdC1sZWFmbGV0XCIsIFwibGVhZmxldFwiXSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1wibGVhZmxldFwiLCBcInJlYWN0LWxlYWZsZXRcIl0sXG4gICAgZXhjbHVkZTogW1wibHVjaWRlLXJlYWN0XCJdLFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImx1Y2lkZS1yZWFjdFwiKSkgcmV0dXJuIFwibHVjaWRlXCI7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlcsU0FBUyxtQkFBbUI7QUFDelksT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLFlBQVksR0FBRyxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQUEsRUFDdkQsS0FBSztBQUFBLElBQ0gsWUFBWSxDQUFDLGlCQUFpQixTQUFTO0FBQUEsRUFDekM7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxXQUFXLGVBQWU7QUFBQSxJQUNwQyxTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjLENBQUMsT0FBTztBQUNwQixjQUFJLEdBQUcsU0FBUyxjQUFjLEVBQUcsUUFBTztBQUFBLFFBQzFDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
