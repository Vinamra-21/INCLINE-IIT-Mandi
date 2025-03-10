"use client";

import type React from "react";

import { useEffect, useState, lazy, Suspense } from "react";
import GraphComponent from "../featureComponents/graph";
import { LeftPanelDrought } from "../featureComponents/CtrlPanels/ctrlPanelDrought";
import type { DroughtData, GeoJsonData } from "../featureComponents/types";
import { Toaster } from "react-hot-toast";
import dr from "../graphData/drought.json";
const MapContent = lazy(() => import("../components/HomeMap"));
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/authContext";

export default function JalShakti() {
  const { currentUser, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [mapHeight, setMapHeight] = useState(50);
  const [droughtData, setDroughtData] = useState<DroughtData>(
    dr.datasets[0]["24.0"]
  );
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData | null>(null);

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

  // Handle data updates from the control panel
  const handleDataUpdate = (data: DroughtData[]) => {
    setDroughtData(data);
  };

  const handleGeoJsonUpdate = (data: GeoJsonData) => {
    setGeoJsonData(data);
  };

  return currentUser ? (
    <div className="flex h-screen bg-gray-800">
      {/* Left Panel */}
      <div
        className={`relative transition-all duration-300 ease-in-out ${
          isPanelOpen ? "w-1/4" : "w-1/30"
        }`}>
        <div
          className="absolute top-2 left-2 bottom-2 bg-gray-700 rounded-2xl shadow-lg 
                     transition-all duration-300 ease-in-out overflow-hidden">
          <LeftPanelDrought
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
            onDataUpdate={handleDataUpdate}
            onGeoJsonUpdate={handleGeoJsonUpdate}
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
              {/* geoJsonData={geoJsonData}*/}
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
          <GraphComponent data={droughtData} />
        </div>
      </div>

      <Toaster />
    </div>
  ) : (
    <Navigate to="/#footer" replace />
  );
}
