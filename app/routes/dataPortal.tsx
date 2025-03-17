import { useEffect, useState, lazy, Suspense } from "react";
import GraphComponent from "~/featureComponents/graph";
import { LeftPanel } from "~/featureComponents/CtrlPanels/ctrlPanelClimate";

const MapContent = lazy(() => import("../components/HomeMap"));

export default function Dashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [mapHeight, setMapHeight] = useState(50); // Height in percentage

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  // Handle mouse movement for resizing
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const newHeight = (e.clientY / window.innerHeight) * 100;
    if (newHeight > 10 && newHeight < 90) {
      setMapHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  useEffect(() => {
    const mainSection = document.getElementById("main-section");
    if (mainSection) {
      window.scrollTo({
        top: mainSection.offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div
      id="main-section"
      className="mt-18 flex h-screen bg-gray-800 text-8xl text-center">
      Coming Soon
    </div>
  );
}
