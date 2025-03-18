import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("ecoPulse", "routes/ecoPulse.tsx"),
  route("about", "routes/about.tsx"),
  route("climateImpact", "routes/climateImpact.tsx"),
  route("droughtMonitor", "routes/droughtMonitor.tsx"),
  route("dataPortal", "routes/dataPortal.tsx"),
  route("extremeIndices", "routes/extremeIndices.tsx"),
  route("watershedDelineation", "routes/watershedDelineation.tsx"),
  route("features", "routes/features.tsx"),
  route("jalShakti", "routes/jalShakti.tsx"),
] satisfies RouteConfig;
