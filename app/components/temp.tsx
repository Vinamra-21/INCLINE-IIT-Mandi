import { useEffect, useState, lazy, Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GraphComponent from "~/featureComponents/graph";
import { LeftPanel } from "~/featureComponents/CtrlPanels/ctrlPanelClimate";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import JSZip from "jszip";

const MapContent = lazy(() => import("../components/HomeMap"));

export default function Dashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [mapHeight, setMapHeight] = useState(50); // Height in percentage
  const [map, setMap] = useState<L.Map | null>(null);
  const [geoJsonLayer, setGeoJsonLayer] = useState<L.GeoJSON | null>(null);
  const [selectedScale, setSelectedScale] = useState("location");
  const [lat, setLat] = useState(28.34);
  const [lng, setLng] = useState(79.43);
  const [variable, setVariable] = useState("spi");
  const [scale, setScale] = useState("1");

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (mapLoaded && !map) {
      const newMap = L.map("map").setView([28.34, 79.43], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(newMap);
      setMap(newMap);
    }
  }, [mapLoaded, map]);

  useEffect(() => {
    if (map) {
      fetchGeoJson(selectedScale);
    }
  }, [map, selectedScale]);

  const fetchGeoJson = async (scale: string) => {
    let url = "";
    if (scale === "district") {
      url = "/static/geojson/output_modified.zip";
    } else if (scale === "state") {
      url = "/static/geojson/India_State_Boundary_modified.zip";
    } else if (scale === "basin") {
      url = "/static/geojson/India_Basin_modified.zip";
    }

    if (url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const zip = await JSZip.loadAsync(blob);
        const geojsonFile = Object.keys(zip.files)[0];
        const geojsonText = await zip.file(geojsonFile).async("string");
        const geojson = JSON.parse(geojsonText);

        if (geoJsonLayer) {
          map.removeLayer(geoJsonLayer);
        }

        const newGeoJsonLayer = L.geoJSON(geojson).addTo(map);
        setGeoJsonLayer(newGeoJsonLayer);
      } catch (error) {
        console.error("Error fetching GeoJSON:", error);
      }
    }
  };

  const handleApiRequest = async () => {
    const url = `http://localhost:8000/api/ds_drought/?lat=${lat}&lng=${lng}&variable=${variable}&scale=${scale}&spatial_scale=${selectedScale}`;
    try {
      const response = await axios.get(url);
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

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
            selectedScale={selectedScale}
            setSelectedScale={setSelectedScale}
            lat={lat}
            setLat={setLat}
            lng={lng}
            setLng={setLng}
            variable={variable}
            setVariable={setVariable}
            scale={scale}
            setScale={setScale}
            handleApiRequest={handleApiRequest}
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
              <div id="map" style={{ height: "100%", width: "100%" }}></div>
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
