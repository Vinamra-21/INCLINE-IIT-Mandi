import { useEffect, useState, lazy, Suspense } from "react";
import GraphComponent from "~/featureComponents/graph";
import { LeftPanel } from "~/featureComponents/CtrlPanels/ctrlPanelWatershed";

const MapContent = lazy(() => import("../components/HomeMap"));

export default function Dashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [mapHeight, setMapHeight] = useState(50);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMapLoaded(true);

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768 && isPanelOpen) {
        setIsPanelOpen(false);
      }
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
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

  // Handle touch events for mobile resize
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (e.touches && e.touches[0]) {
      const newHeight = (e.touches[0].clientY / window.innerHeight) * 100;
      if (newHeight > 15 && newHeight < 85) {
        setMapHeight(newHeight);
      }
    }
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
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
      className="mt-4 sm:mt-8 md:mt-18 flex flex-col md:flex-row w-full min-h-screen bg-white/90 dark:bg-gray-800 pb-16 md:pb-4"
      id="main-section">
      {/* Menu Toggle Button - Now on the left side */}
      <button
        className={`fixed z-40 top-16 left-4 bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
          isPanelOpen ? "transform rotate-0" : ""
        }`}
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        aria-label={isPanelOpen ? "Close panel" : "Open panel"}>
        {isPanelOpen ? "✕" : "☰"}
      </button>

      {/* Left Panel - adjusts for mobile */}
      <div
        className={`md:relative transition-all duration-300 ease-in-out ${
          isMobile
            ? isPanelOpen
              ? "h-screen fixed z-30 w-full top-0 left-0"
              : "h-0 w-0"
            : isPanelOpen
            ? "w-1/4"
            : "w-0"
        }`}>
        <div
          className={`${
            isMobile
              ? isPanelOpen
                ? "absolute inset-0 mt-16 mb-4 mx-3"
                : "hidden"
              : "absolute top-2 left-2 bottom-2"
          } 
                    bg-gray-700 rounded-2xl shadow-lg
                    transition-all duration-300 ease-in-out overflow-hidden`}>
          <LeftPanel
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
          />
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 p-2 md:p-3 transition-all duration-300 ${
          isPanelOpen ? "md:ml-4" : ""
        }`}>
        {/* Map Container */}
        <div
          className="border border-gray-200 rounded-2xl overflow-hidden
                    bg-white shadow-lg mb-4"
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

        {/* Resize Handle - works with touch and mouse */}
        <div
          className="w-full h-8 cursor-row-resize flex items-center justify-center touch-manipulation mb-4"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}>
          <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
        </div>

        {/* Graph Container */}
        <div
          className="border border-gray-200 rounded-2xl overflow-hidden
                    bg-white shadow-lg"
          style={{
            height: `${100 - mapHeight - (isMobile ? 12 : 6)}vh`,
            minHeight: isMobile ? "300px" : "200px",
          }}>
          <GraphComponent />
        </div>
      </div>
    </div>
  );
}
