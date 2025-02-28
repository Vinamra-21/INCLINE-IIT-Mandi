"use client";

import { useState } from "react";
import { Download, ChevronDown, Loader2 } from "lucide-react";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { fetchDroughtData, fetchGeoJson } from "./api";
import { toast } from "react-hot-toast";

type DroughtIndex = "spi" | "pdsi" | "spei";
type SpatialScale = "location" | "state" | "district" | "basin";
type TimeScale = "1month" | "3month" | "6month" | "12month";

interface LeftPanelProps {
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  onDataUpdate: (data: any) => void;
  onGeoJsonUpdate: (data: any) => void;
}

export function LeftPanelDrought({
  isPanelOpen,
  setIsPanelOpen,
  onDataUpdate,
  onGeoJsonUpdate,
}: LeftPanelProps) {
  // Form state
  const [droughtIndex, setDroughtIndex] = useState<DroughtIndex>("spi");
  const [spatialScale, setSpatialScale] = useState<SpatialScale>("location");
  const [timeScale, setTimeScale] = useState<TimeScale>("1month");
  const [latitude, setLatitude] = useState("31.78");
  const [longitude, setLongitude] = useState("71.99");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  // Validate coordinates
  const validateCoordinates = () => {
    const lat = Number.parseFloat(latitude);
    const long = Number.parseFloat(longitude);
    if (isNaN(lat) || isNaN(long)) {
      toast.error(
        "Invalid coordinates. Please enter valid latitude and longitude values"
      );
      return false;
    }
    if (lat < -90 || lat > 90 || long < -180 || long > 180) {
      toast.error("Invalid coordinates. Coordinates out of valid range");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateCoordinates()) return;

    setIsLoading(true);
    try {
      // Fetch both drought data and GeoJSON in parallel
      const [droughtData, geoJsonData] = await Promise.all([
        fetchDroughtData({
          lat: Number.parseFloat(latitude),
          long: Number.parseFloat(longitude),
          droughtIndex,
          spatialScale,
          timeScale,
        }),
        fetchGeoJson({
          spatialScale,
          droughtIndex,
        }),
      ]);

      onDataUpdate(droughtData);
      onGeoJsonUpdate(geoJsonData);

      toast.success("The drought data has been successfully updated");
    } catch (error) {
      toast.error("Failed to fetch drought data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle spatial scale selection
  const handleSpatialScaleClick = (scale: SpatialScale) => {
    setSpatialScale(scale);
    // Automatically fetch new data when scale changes
    handleSubmit();
  };

  // Download data
  const handleDownload = async () => {
    if (!validateCoordinates()) return;

    try {
      const data = await fetchDroughtData({
        lat: Number.parseFloat(latitude),
        long: Number.parseFloat(longitude),
        droughtIndex,
        spatialScale,
        timeScale,
      });

      // Create CSV content
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Date,Value\n" +
        data.map((row) => `${row.date},${row.value}`).join("\n");

      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `drought-data-${droughtIndex}-${timeScale}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Failed to download data. Please try again.");
    }
  };

  return (
    <>
      {isPanelOpen ? (
        <div className="relative h-full p-4 space-y-2 bg-white dark:bg-gray-800 overflow-y-scroll overflow-x-hidden">
          {/* Panel toggle button */}
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 translate-x-1/2 z-10">
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-50" />
          </button>

          {/* Header */}
          <div className="relative mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Drought Monitor
            </h2>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Spatial pattern of drought
              </p>
              <div className="relative flex items-center">
                <button
                  onClick={() => setIsEnabled(!isEnabled)}
                  className={`relative w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-200 p-1 ${
                    isEnabled ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  aria-pressed={isEnabled}>
                  <span
                    className={`w-8 h-6 bg-white dark:bg-gray-600 rounded-full shadow-md transition-transform duration-200 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300 transform ${
                      isEnabled ? "translate-x-5" : "translate-x-0"
                    }`}>
                    {isEnabled ? "ON" : "OFF"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Drought Index */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 pb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
              Drought Index
            </h3>
            <div className="relative">
              <select
                value={droughtIndex}
                onChange={(e) =>
                  setDroughtIndex(e.target.value as DroughtIndex)
                }
                className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                         text-gray-900 dark:text-gray-100 rounded-lg 
                         focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                         appearance-none transition-all duration-200
                         hover:border-green-300 dark:hover:border-green-300/50">
                <option value="spi">SPI</option>
                <option value="pdsi">PDSI</option>
                <option value="spei">SPEI</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                                  text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Spatial Scale */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 pb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
              Spatial Scale
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {(
                ["location", "state", "district", "basin"] as SpatialScale[]
              ).map((scale) => (
                <button
                  key={scale}
                  onClick={() => handleSpatialScaleClick(scale)}
                  className={`p-2 rounded-lg transition-all duration-200 font-medium
                           ${
                             spatialScale === scale
                               ? "bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900"
                               : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                           } hover:border-green-300 dark:hover:border-green-300/50
                           focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50`}>
                  {scale.charAt(0).toUpperCase() + scale.slice(1)}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">
              Please click on the map for your desired location, or
              <br />
              Enter your latitude and longitude here:
            </p>

            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Latitude:
                </label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full p-1.5 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                           text-gray-900 dark:text-gray-100 rounded-lg 
                           focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                           transition-all duration-200
                           hover:border-green-300 dark:hover:border-green-300/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Longitude:
                </label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full p-1.5 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                           text-gray-900 dark:text-gray-100 rounded-lg 
                           focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                           transition-all duration-200
                           hover:border-green-300 dark:hover:border-green-300/50"
                />
              </div>
            </div>

            <div className="flex justify-center mt-3">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-4 py-1.5 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900 rounded-lg 
                         focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50
                         transition-all duration-200 font-medium
                         hover:bg-green-400 dark:hover:bg-green-300 shadow-sm hover:shadow-md
                         disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>

          {/* Time Scale */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 pb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
              Scale
            </h3>
            <div className="relative mb-4">
              <select
                value={timeScale}
                onChange={(e) => setTimeScale(e.target.value as TimeScale)}
                className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                         text-gray-900 dark:text-gray-100 rounded-lg 
                         focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                         appearance-none transition-all duration-200
                         hover:border-green-300 dark:hover:border-green-300/50">
                <option value="1month">1-month</option>
                <option value="3month">3-month</option>
                <option value="6month">6-month</option>
                <option value="12month">12-month</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                                  text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownload}
                disabled={isLoading}
                className="w-full p-3 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900
                         rounded-lg transition-all duration-200 font-medium
                         hover:bg-green-400 dark:hover:bg-green-300
                         focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                         shadow-sm hover:shadow-md
                         disabled:opacity-50 disabled:cursor-not-allowed">
                <div className="flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Data</span>
                </div>
              </button>

              <button
                className="w-full p-3 border border-gray-200 dark:border-gray-700
                         text-gray-700 dark:text-gray-300 rounded-lg
                         hover:border-green-300 dark:hover:border-green-300/50
                         hover:text-green-600 dark:hover:text-green-300
                         transition-all duration-200 font-medium
                         focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                         bg-white dark:bg-gray-800 shadow-sm hover:shadow-md">
                <div className="flex items-center justify-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Send Feedback</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-1 flex items-center justify-center h-full w-full bg-white dark:bg-gray-800">
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="relative z-10">
            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-50" />
          </button>
        </div>
      )}
    </>
  );
}
