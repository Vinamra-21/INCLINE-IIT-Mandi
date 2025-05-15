import type React from "react";
import { useEffect, useState, lazy, Suspense } from "react";
import GraphComponent from "~/featureComponents/Graphs/graphClimateImpact";
import { LeftPanel } from "~/featureComponents/CtrlPanels/ctrlPanelClimate";
import API_BASE from "~/api";
const MapContent = lazy(() => import("~/featureComponents/Graphs/FeatureMap"));
type StateType = {
  objectId: number;
  variable: string;
  spatial_scale: string;
  temporal_scale: string;
  latitude: string;
  longitude: string;
  model: string;
};

export default function Dashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [mapHeight, setMapHeight] = useState(50);
  const [isMobile, setIsMobile] = useState(false);
  const [params, setParams] = useState<StateType>({
    objectId: 23,
    variable: "pr",
    spatial_scale: "location",
    temporal_scale: "annual",
    latitude: "31.7754",
    longitude: "76.9861",
    model: "ACCESS_CM2",
  });

  const [geoJsonData, setGeoJsonData] =
    useState<GeoJSON.FeatureCollection | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Add a state to store feature properties for location name display
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

  // Modified function to accept all necessary parameters
  // Fix for getDataWithObjectId function

  const getDataWithObjectId = async (
    objectId: number,
    newParams?: Partial<StateType>
  ) => {
    console.log("getDataWithObjectId called with objectId:", objectId);

    // Use provided newParams or fall back to current state
    const requestParams = {
      ...params,
      ...(newParams || {}),
      objectId: objectId,
    };

    // Log the actual params being used for the API call
    console.log("Using params for API call:", requestParams);

    if (
      !requestParams.variable ||
      !requestParams.spatial_scale ||
      !requestParams.model ||
      !objectId
    ) {
      console.error("Missing required parameters:", {
        variable: requestParams.variable,
        spatial_scale: requestParams.spatial_scale,
        model: requestParams.model,
        objectId: objectId,
      });
      return;
    }

    setIsLoading(true);

    try {
      let url = "";
      // Build URL based on spatial_scale - important to use requestParams not params
      if (requestParams.spatial_scale === "location") {
        // For point location - use ds_cis endpoint
        url = `${API_BASE}/api/ds_cis/?lat=${requestParams.latitude}&lng=${requestParams.longitude}&variable=${requestParams.variable}&temporal_scale=${requestParams.temporal_scale}&spatial_scale=${requestParams.spatial_scale}&model=${requestParams.model}`;
      } else {
        // For state, district, basin - use df_cis endpoint with objectid
        url = `${API_BASE}/api/df_cis/?objectid=${objectId}&variable=${requestParams.variable}&temporal_scale=${requestParams.temporal_scale}&spatial_scale=${requestParams.spatial_scale}&model=${requestParams.model}`;
      }

      console.log(
        "Fetching climate data from:",
        url,
        "with objectId:",
        objectId
      );

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store", // Prevent caching to ensure fresh data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Received climate data:", responseData);
      setData(responseData);
    } catch (error) {
      console.error("Error fetching climate data:", error);
      // Show error notification to user here
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

  // Update the handleMapClick function

  const handleMapClick = (lat: number, lng: number, objectId: number) => {
    console.log(
      `Map clicked at lat: ${lat}, lng: ${lng}, objectId: ${objectId}`
    );

    // Reset selected feature properties for point locations
    setSelectedFeatureProps(null);

    // Create new params with all updated values
    const newParams = {
      ...params,
      objectId: objectId,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
      spatial_scale: "location", // Switch to location mode for direct map clicks
    };

    // IMPORTANT: Call getDataWithObjectId BEFORE updating state
    // This ensures we use the new parameters directly
    getDataWithObjectId(objectId, {
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
      spatial_scale: "location",
      objectId: objectId,
    });

    // Auto-open panel if it's closed
    if (!isPanelOpen) {
      setIsPanelOpen(true);
    }

    // Update params with new values after API call
    setParams(newParams);
  };

  // Fix for the handleFeatureSelect function

  const handleFeatureSelect = (feature: any) => {
    if (!feature || !feature.properties) {
      console.error("Invalid feature selected");
      return;
    }

    // Find objectId from various properties
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

    // Determine spatial scale based on feature type
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

    // First prepare the complete new params without changing state yet
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

    // Important: Make the API call with the new params directly
    // Call the API first, then update the state
    getDataWithObjectId(objId, newParams);

    // Now update the state after calling the API
    setParams(newParams);
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

  // When spatial_scale changes but isn't "location", reset selected feature properties
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
                Loading climate data...
              </div>
            </div>
          ) : (
            <GraphComponent
              data={data}
              temporal_scale={params.temporal_scale}
              locationInfo={{
                type: params.spatial_scale,
                lat: params.latitude,
                lng: params.longitude,
              }}
              featureProperties={selectedFeatureProps}
              variable={params.variable}
            />
          )}
        </div>
      </div>
    </div>
  );
}
