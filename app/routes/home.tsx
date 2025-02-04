import type { Route } from "./+types/home";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

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
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
