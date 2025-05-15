import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Download,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import API_BASE from "~/api";

// Define types for watershed data
interface WatershedData {
  watershed: GeoJSON.FeatureCollection;
  riverline: GeoJSON.FeatureCollection;
  stream_lat: number;
  stream_lng: number;
}

interface LeftPanelProps {
  isPanelOpen: boolean;
  setIsPanelOpen: (isOpen: boolean) => void;
  setWatershedData: (data: WatershedData | null) => void;
  latitude: string;
  longitude: string;
  setLatitude: (lat: string) => void;
  setLongitude: (lng: string) => void;
}

export function LeftPanel({
  isPanelOpen,
  setIsPanelOpen,
  setWatershedData,
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}: LeftPanelProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle getting current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          setIsLoading(false);
          setError(null);
        },
        (error) => {
          setIsLoading(false);
          setError("Error getting location: " + error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Handle delineate button click
  const handleDelineate = async () => {
    if (!latitude || !longitude) {
      setError("Please enter both latitude and longitude");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Call the watershed API
      const response = await fetch(
        `${API_BASE}/api/watershed/?lat=${latitude}&lng=${longitude}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: WatershedData = await response.json();

      // Pass the watershed data up to the parent component
      setWatershedData(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(
        `Failed to fetch watershed data: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <>
      {isPanelOpen ? (
        <div className="relative h-full p-4 space-y-4 bg-white dark:bg-gray-900 overflow-y-scroll overflow-x-hidden">
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 translate-x-1/2 z-10">
            {isPanelOpen ? (
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-50" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-50" />
            )}
          </button>

          <div className="relative mb-4 pr-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Watersheds
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Click on the map to set a location or use the inputs below.
            </p>
          </div>

          {/* Display error message if any */}
          {error && (
            <div className="p-2 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Get Current Location Button */}
          <button
            className="w-full p-3 bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300
                       rounded-lg transition-all duration-200 font-medium
                       hover:bg-blue-200 dark:hover:bg-blue-800/50
                       focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700/30
                       border border-blue-200 dark:border-blue-800/50"
            onClick={getCurrentLocation}
            disabled={isLoading}>
            <div className="flex items-center justify-center">
              {isLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Fetch Current Location</span>
                </>
              )}
            </div>
          </button>

          {/* Lat/Long Input */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Latitude:
                </label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Enter latitude"
                  className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                             text-gray-900 dark:text-gray-100 rounded-lg 
                             focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                             placeholder-gray-400 dark:placeholder-gray-500"
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
                  placeholder="Enter longitude"
                  className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                             text-gray-900 dark:text-gray-100 rounded-lg 
                             focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                             placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* Delineate Button */}
            <button
              className="w-full p-3 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900
                         rounded-lg transition-all duration-200 font-medium
                         hover:bg-green-400 dark:hover:bg-green-300
                         focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                         shadow-sm hover:shadow-md dark:shadow-gray-800/30"
              onClick={handleDelineate}
              disabled={isLoading}>
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <span>Delineate</span>
                )}
              </div>
            </button>

            <button
              className="w-full p-3 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900
                               rounded-lg transition-all duration-200 font-medium
                               hover:bg-green-400 dark:hover:bg-green-300
                               focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                               shadow-sm hover:shadow-md dark:shadow-gray-800/30">
              <div className="flex items-center justify-center">
                <Download className="mr-2 h-4 w-4" />
                <span>Download Watershed Data</span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-1 flex items-center justify-center h-full w-full bg-white dark:bg-gray-900">
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
