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
  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
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
          isPanelOpen ? "w-1/4" : "w-0"
        }`}>
        <div
          className={`absolute top-4 left-4 bottom-4 bg-gray-700 rounded-2xl shadow-lg 
                     transition-all duration-300 ease-in-out overflow-hidden
                     ${isPanelOpen ? "w-[calc(100%-32px)]" : "w-0"}`}>
          <LeftPanel />
        </div>
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
          {isPanelOpen ? (
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-50" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-50" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-4 transition-all duration-300">
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
