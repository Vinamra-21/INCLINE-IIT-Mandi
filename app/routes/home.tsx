import type { Route } from "./+types/home";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { useEffect } from "react";
import QuickPulse from "../components/QuickPulse";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "INCLINE" },
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <QuickPulse />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
