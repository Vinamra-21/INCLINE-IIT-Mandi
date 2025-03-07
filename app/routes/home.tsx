import type { Route } from "./+types/home";

import Hero from "../components/Hero";
import Features from "../components/Features";

import { useEffect, useState } from "react";
import QuickPulse from "../components/QuickPulse";
import WeatherDashboard from "~/components/WeatherDash";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "INCLINE" },
    { author: "Vinamra Garg" },
    {
      name: "Indian Climate Information and Explorer",
      content:
        "Incline provides the public, researchers, government agencies, and industry stakeholders with essential data & tools for climate adaptation planning, building resiliency, and fostering community engagement",
    },
  ];
}

export default function Home() {
  useEffect(() => {
    const scriptThree = document.createElement("script");
    scriptThree.src =
      "https://cdn.jsdelivr.net/npm/three@0.161/build/three.module.js";
    scriptThree.type = "module";
    scriptThree.async = true;
    document.body.appendChild(scriptThree);

    const scriptJsm = document.createElement("script");
    scriptJsm.src = "https://cdn.jsdelivr.net/npm/three@0.161/examples/jsm/";
    scriptJsm.type = "module";
    scriptJsm.async = true;
    document.body.appendChild(scriptJsm);

    return () => {
      document.body.removeChild(scriptThree);
      document.body.removeChild(scriptJsm);
    };
  }, []);
  return (
    <>
      <Hero />
      <QuickPulse />
      <WeatherDashboard />
      <Features />
    </>
  );
}
