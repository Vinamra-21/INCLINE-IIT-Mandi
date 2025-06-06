import { useEffect, useState, lazy, Suspense } from "react";
import GraphComponent from "~/featureComponents/Graphs/graphIndices";
import { LeftPanel } from "~/featureComponents/CtrlPanels/ctrlPanelIndices";
import API_BASE from "~/api";
const MapContent = lazy(() => import("../featureComponents/Graphs/FeatureMap"));

export default function Dashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [mapHeight, setMapHeight] = useState(50);
  const [isMobile, setIsMobile] = useState(false);

  const [params, setParams] = useState<Record<string, string>>({
    spatial_scale: "location",
    variable_type: "Temperature",
    data_type: "Raw Data",
    latitude: "31.7754",
    longitude: "76.9861",
    precipitation_index: "Rx1day",
  });
  const [geoJsonData, setGeoJsonData] =
    useState<GeoJSON.FeatureCollection | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMapLoaded(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768 && isPanelOpen) {
        setIsPanelOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const fetchGeoJson = async () => {
      const spatialScale = "location";

      if (spatialScale) {
        const location = {
          location: "india",
        };

        try {
          const response = await fetch(
            `/geojson/${
              location[(spatialScale as keyof typeof location) || "location"]
            }.json`,
            {
              method: "GET",
              headers: {
                "Cache-Control": "max-age=86400",
              },
            }
          );

          if (response.ok) {
            const data: GeoJSON.FeatureCollection = await response.json();
            setGeoJsonData(data);
          } else {
            console.error("Failed to fetch GeoJSON data");
          }
        } catch (error) {
          console.error("Error fetching GeoJSON data:", error);
        }
      }
    };

    fetchGeoJson();
  }, []);

  const getData = async () => {
    if (!params.variable_type || !params.latitude || !params.longitude) {
      console.error("Missing required parameters");
      return;
    }

    setIsLoading(true);

    try {
      let url = "";
      const variable =
        params.variable_type === "Precipitation" ? "ppt" : "temp";
      const spatialScale = "location";
      const index =
        params.variable_type === "Precipitation"
          ? params.precipitation_index || "Rx1day"
          : params.temperature_index || "TNx";

      url = `${API_BASE}/api/ds_extreme/?lat=${params.latitude}&lng=${params.longitude}&variable=${variable}&spatial_scale=${spatialScale}&indices=${index}`;

      console.log("Fetching extremes data from:", url);

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Received extremes data:", responseData);
      setData(responseData);
    } catch (error) {
      console.error("Error fetching extremes data:", error);
      // Show error notification to user here
    } finally {
      setIsLoading(false);
    }
  };

  // Add a handler for map clicks
  const handleMapClick = (lat: number, lng: number) => {
    console.log(`Map clicked at lat: ${lat}, lng: ${lng}`);

    // Update params with new latitude and longitude
    const updatedParams = {
      ...params,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
    };

    setParams(updatedParams);

    // Auto-open panel if it's closed
    if (!isPanelOpen) {
      setIsPanelOpen(true);
    }

    // Auto-fetch data after a short delay (to ensure params are updated)
    setTimeout(() => {
      getData();
    }, 100);
  };

  const handleFeatureSelect = (feature: any) => {
    console.log("Selected feature:", feature);

    // Get the objectId from the selected feature
    const objectId =
      feature.properties?.objectid || feature.properties?.OBJECTID || "23.0";

    // Update params with feature information
    setParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        objectId: objectId.toString(),
      };

      // Auto-fetch data after updating feature
      setTimeout(() => {
        getData();
      }, 100);

      return updatedParams;
    });
  };

  // Handle manual submission from the control panel
  const handleSubmitParams = () => {
    getData();
  };

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

  // Fetch data initially when component loads
  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="mt-4 sm:mt-8 md:mt-18 flex flex-col md:flex-row w-full min-h-screen bg-white/90 dark:bg-gray-800 pb-16 md:pb-4"
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
            : "w-1/30"
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
            params={params}
            setParams={setParams}
            getData={handleSubmitParams}
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
          className="border border-gray-200 rounded-2xl overflow-hidden resize-y
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
              <MapContent
                onMapClick={handleMapClick}
                params={params}
                geoJsonData={geoJsonData || undefined}
                onFeatureSelect={handleFeatureSelect}
              />
            </Suspense>
          )}
        </div>

        {/* Resize Handle - works with touch and mouse */}
        <div
          className="w-full h-6 md:h-2 cursor-row-resize flex items-center justify-center touch-manipulation mb-4"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}>
          <div className="w-16 md:w-10 h-2 bg-gray-300 rounded-full"></div>
        </div>

        {/* Graph Container */}
        <div
          className="border border-gray-200 rounded-2xl overflow-hidden
                    bg-white shadow-lg"
          style={{
            height: `${100 - mapHeight - (isMobile ? 12 : 6)}vh`,
            minHeight: isMobile ? "300px" : "200px",
          }}>
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <div className="animate-pulse text-gray-500">
                Loading extremes data...
              </div>
            </div>
          ) : (
            <GraphComponent data={data} variable="indices" />
          )}
        </div>
      </div>
    </div>
  );
}
