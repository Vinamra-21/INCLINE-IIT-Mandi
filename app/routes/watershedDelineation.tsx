import { useEffect, useState, lazy, Suspense } from "react";
import { LeftPanel } from "~/featureComponents/CtrlPanels/ctrlPanelWatershed";

const MapContent = lazy(
  () => import("../featureComponents/Graphs/watershedMap")
);

// Define types for watershed data
interface WatershedData {
  watershed: GeoJSON.FeatureCollection;
  riverline: GeoJSON.FeatureCollection;
  stream_lat: number;
  stream_lng: number;
}

export default function Dashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [watershedData, setWatershedData] = useState<WatershedData | null>(
    null
  );
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

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

  useEffect(() => {
    const mainSection = document.getElementById("main-section");
    if (mainSection) {
      window.scrollTo({
        top: mainSection.offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  // Handle map click
  const handleMapClick = (lat: number, lng: number) => {
    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
  };

  return (
    <div className="mt-4 sm:mt-8 md:mt-18">
      <div
        className=" flex flex-col md:flex-row w-full min-h-screen bg-white/90 dark:bg-gray-800 pb-16 md:pb-4"
        id="main-section">
        {/* Menu Toggle Button - Now on the left side */}
        {isMobile && (
          <button
            className={`fixed z-40 top-16 right-4 bg-gray-700 text-white p-2 rounded-xl shadow-lg transition-all duration-300 ${
              isPanelOpen ? "transform rotate-0" : ""
            }`}
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            aria-label={isPanelOpen ? "Close panel" : "Open panel"}>
            {isPanelOpen ? "✕" : "☰"}
          </button>
        )}
        {/* Left Panel - adjusts for mobile */}
        <div
          className={`md:relative transition-all duration-300 ease-in-out ${
            isMobile
              ? isPanelOpen
                ? "h-screen fixed z-30 w-full top-0 left-0"
                : "h-0 w-0"
              : isPanelOpen
              ? "w-1/4"
              : "w-12" // Standardized width when closed
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
              setWatershedData={setWatershedData}
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          </div>
        </div>

        {/* Main Content - Map now fills the entire right side */}
        <div
          className={`flex flex-col flex-1 transition-all duration-300 ${
            isPanelOpen ? "md:ml-4" : "" // Removed w-4/5 to let flex-1 handle width
          }`}>
          {/* Map Container - now fills 100% of height and removes padding */}
          <div
            className="z-0 border border-gray-200 rounded-2xl overflow-hidden 
                    bg-white shadow-lg h-full"
            style={{ height: "calc(100vh - 4rem)" }}>
            {" "}
            {/* Increased height from 6rem to 4rem */}
            {mapLoaded && (
              <Suspense
                fallback={
                  <div className="h-full w-full bg-gray-50 flex items-center justify-center">
                    <div className="animate-pulse text-gray-500">
                      Loading map...
                    </div>
                  </div>
                }>
                <MapContent
                  watershedData={watershedData}
                  onMapClick={handleMapClick}
                />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
