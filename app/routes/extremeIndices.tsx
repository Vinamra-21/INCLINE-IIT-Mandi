import { useEffect, useState, lazy, Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GraphComponent from "~/featureComponents/graph";
import { LeftPanel } from "~/featureComponents/ctrlPanel";

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

  return (
    <div className="flex h-screen bg-gray-800">
      {/* Left Panel */}
      <div
        className={`relative transition-all duration-300 ease-in-out ${
          isPanelOpen ? "w-1/4" : "w-1/30"
        }`}>
        <div
          className={`absolute top-2 left-2 bottom-2 bg-gray-700 rounded-2xl shadow-lg 
                     transition-all duration-300 ease-in-out overflow-hidden
                     `}>
          <LeftPanel
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-2 transition-all duration-300">
        {/* Map Container */}
        <div
          className="border border-gray-200 rounded-2xl overflow-hidden resize-y 
                     bg-white shadow-lg"
          style={{ height: `${mapHeight}vh` }}>
          {mapLoaded && (
            <Suspense
              fallback={
                <div className="h-full w-full bg-gray-50 flex items-center justify-center">
                  <div className="animate-pulse text-gray-500">
                    Loading map...
                  </div>
                </div>
              }>
              <MapContent />
            </Suspense>
          )}
        </div>

        {/* Resize Handle */}
        <div
          className="w-full h-2 cursor-row-resize flex items-center justify-center"
          onMouseDown={handleMouseDown}>
          <div className="w-10 h-1 bg-gray-300 rounded"></div>
        </div>

        {/* Graph Container */}
        <div
          className="border border-gray-200 rounded-2xl overflow-hidden resize-y 
                     bg-white shadow-lg"
          style={{ height: `${100 - mapHeight}vh` }}>
          <GraphComponent />
        </div>
      </div>
    </div>
  );
}
