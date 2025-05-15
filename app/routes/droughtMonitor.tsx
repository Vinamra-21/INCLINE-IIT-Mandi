import type React from "react";

import { useEffect, useState, lazy, Suspense } from "react";
import GraphComponent from "~/featureComponents/Graphs/graphDrought";
import { LeftPanel } from "~/featureComponents/CtrlPanels/ctrlPanelDrought";
import API_BASE from "~/api";
const MapContent = lazy(() => import("~/featureComponents/Graphs/FeatureMap"));

type DroughtParams = {
  objectId: number;
  variable: string;
  spatial_scale: string;
  time_scale: string;
  latitude: string;
  longitude: string;
};

export default function Dashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [mapHeight, setMapHeight] = useState(50);
  const [isMobile, setIsMobile] = useState(false);
  const [params, setParams] = useState<DroughtParams>({
    objectId: 24,
    variable: "spi",
    spatial_scale: "location",
    time_scale: "1",
    latitude: "31.78",
    longitude: "76.99",
  });
  const [geoJsonData, setGeoJsonData] =
    useState<GeoJSON.FeatureCollection | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Add state to store feature properties for location name display
  const [selectedFeatureProps, setSelectedFeatureProps] = useState<any>(null);
  // Add a ref to store the current objectId for API calls
  const currentObjectId = useState<number>(params.objectId)[0];

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
      if (params.spatial_scale) {
        const location = {
          district: "district",
          state: "state",
          location: "india",
          basin: "basin",
        };

        try {
          const response = await fetch(
            `/geojson/${
              location[
                (params.spatial_scale as keyof typeof location) || "location"
              ]
            }.json`,
            {
              method: "GET",
              headers: {
                "Cache-Control": "max-age=86400", // Ensure the server sets this header
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
  }, [params.spatial_scale]);

  // Function to get data with a specific objectId
  const getDataWithObjectId = async (objectId: number) => {
    console.log("getDataWithObjectId called with objectId:", objectId);

    if (!params.variable || !params.spatial_scale || !params.time_scale) {
      console.error("Missing required parameters:", {
        variable: params.variable,
        spatial_scale: params.spatial_scale,
        time_scale: params.time_scale,
      });
      return;
    }

    setIsLoading(true);

    try {
      let url = "";
      // Build URL based on spatial_scale
      if (params.spatial_scale === "location") {
        // For point location - use ds_drought endpoint
        url = `${API_BASE}/api/ds_drought/?lat=${params.latitude}&lng=${params.longitude}&variable=${params.variable}&scale=${params.time_scale}&spatial_scale=${params.spatial_scale}`;
      } else {
        // For state, district, basin - use df_drought endpoint with objectid
        url = `${API_BASE}/api/df_drought/?objectid=${objectId}&variable=${params.variable}&scale=${params.time_scale}&spatial_scale=${params.spatial_scale}`;
      }

      console.log(
        "Fetching drought data from:",
        url,
        "with objectId:",
        objectId
      );

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Received drought data:", responseData);
      setData(responseData);
    } catch (error) {
      console.error("Error fetching drought data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Original getData function now uses the current params.objectId
  const getData = async () => {
    console.log("getData called with params:", params);
    console.log("objectId value:", params.objectId);
    await getDataWithObjectId(params.objectId);
  };

  const handleMapClick = (lat: number, lng: number, objectId: number) => {
    console.log(
      `Map clicked at lat: ${lat}, lng: ${lng}, objectId: ${objectId}`
    );

    // Reset selected feature properties for point locations
    setSelectedFeatureProps(null);

    // Update params with new latitude, longitude, and objectId
    setParams((prevParams) => ({
      ...prevParams,
      objectId: objectId,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
      spatial_scale: "location", // Switch to location mode for direct map clicks
    }));

    // Auto-open panel if it's closed
    if (!isPanelOpen) {
      setIsPanelOpen(true);
    }

    // Call getDataWithObjectId directly with the objectId
    setTimeout(() => {
      console.log("Fetching data with objectId from map click:", objectId);
      getDataWithObjectId(objectId);
    }, 100);
  };

  const handleFeatureSelect = (feature: any) => {
    if (!feature || !feature.properties) {
      console.error("Invalid feature selected");
      return;
    }

    // Try to find objectId from various property names
    const keys = Object.keys(feature.properties);
    let objId = null;

    const idProps = [
      "OBJECTID",
      "objectid",
      "object_id",
      "object",
      "id",
      "ID",
      "fid",
      "FID",
    ];

    for (const prop of idProps) {
      if (feature.properties[prop] !== undefined) {
        objId = feature.properties[prop];
        break;
      }
    }

    // Make sure objId is a valid number
    if (objId === null || objId === undefined) {
      console.error(
        "Could not find objectId in feature properties:",
        feature.properties
      );
      return;
    }

    if (typeof objId === "string") {
      objId = Number.parseInt(objId, 10);
    }

    // Ensure objId is a valid number and not 0 or NaN
    if (!objId || isNaN(objId)) {
      console.error("Invalid objectId:", objId);
      return;
    }

    console.log("Selected feature with objectId:", objId);
    console.log("Feature properties:", feature.properties);

    let spatialScale = params.spatial_scale;

    if (feature.properties.type) {
      const typeMap: Record<string, string> = {
        district: "district",
        state: "state",
        basin: "basin",
        location: "location",
      };
      if (feature.properties.type in typeMap) {
        spatialScale = typeMap[feature.properties.type];
      }
    }

    // Store the feature properties for use in the GraphComponent
    setSelectedFeatureProps(feature.properties);

    // Create a new params object with all updates at once
    const newParams = {
      ...params,
      objectId: objId,
      spatial_scale: spatialScale,
    };

    // If this is a point feature, also update lat/lng
    if (feature.geometry && feature.geometry.type === "Point") {
      const coordinates = feature.geometry.coordinates;
      newParams.latitude = coordinates[1].toFixed(6);
      newParams.longitude = coordinates[0].toFixed(6);
    }

    // Update params once with all changes
    console.log("Updating params with:", newParams);
    setParams(newParams);

    // Call getDataWithObjectId directly with the objectId
    setTimeout(() => {
      console.log("Fetching data with objectId:", objId);
      getDataWithObjectId(objId);
    }, 100);
  };

  // Manual submission from the control panel
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

  // When spatial_scale changes to "india", set a default name
  useEffect(() => {
    if (params.spatial_scale === "india") {
      setSelectedFeatureProps({ name: "India (Average)" });
    }
  }, [params.spatial_scale]);

  // Fetch data initially when component loads
  useEffect(() => {
    if (params.variable && params.spatial_scale) {
      getData();
    }
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
                Loading drought data...
              </div>
            </div>
          ) : (
            <GraphComponent
              data={data}
              temporalScale={params.time_scale}
              variable={params.variable}
              locationInfo={{
                type: params.spatial_scale,
                lat: params.latitude,
                lng: params.longitude,
              }}
              featureProperties={selectedFeatureProps}
            />
          )}
        </div>
      </div>
    </div>
  );
}
