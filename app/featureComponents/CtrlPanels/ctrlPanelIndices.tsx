import {
  Download,
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

import React, { useState, useEffect } from "react";

export function LeftPanel({
  isPanelOpen,
  setIsPanelOpen,
  params,
  setParams,
  getData,
}: {
  isPanelOpen: boolean;
  setIsPanelOpen: (value: boolean) => void;
  params: Record<string, string>;
  setParams: (value: Record<string, string>) => void;
  getData: () => void;
}) {
  // Dashboard panel options
  const variableTypes = ["Temperature", "Precipitation"];
  const temperatureIndices = [
    "TNx",
    "TNn",
    "FD",
    "TR",
    "TX10p",
    "TX90p",
    "TN10p",
    "TN90p",
    "CSDI",
  ];
  const precipitationIndices = [
    "Rx1day",
    "Rx5day",
    "R10mm",
    "R20mm",
    "R5mm",
    "CDD",
    "CWD",
    "PRCPTOT",
  ];
  const [showSpatialPattern, setShowSpatialPattern] = useState(false);

  // Auto-apply changes when variable type or index changes
  useEffect(() => {
    if (params.variable_type === "Temperature" && params.temperature_index) {
      getData();
    } else if (
      params.variable_type === "Precipitation" &&
      params.precipitation_index
    ) {
      getData();
    }
  }, [
    params.variable_type,
    params.temperature_index,
    params.precipitation_index,
  ]);

  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setParams({
            ...params,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to retrieve your location. Please enter coordinates manually."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      {isPanelOpen ? (
        <div className="relative h-full p-4 space-y-2 bg-white dark:bg-gray-900 overflow-y-scroll overflow-x-hidden">
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 translate-x-1/2 z-10">
            {isPanelOpen ? (
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-50" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-50" />
            )}
          </button>

          <div className="relative mb-8 pr-2">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Dashboard Controls
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Configure your view preferences
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Location Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Latitude"
                  value={params.latitude || ""}
                  onChange={(e) =>
                    setParams({ ...params, latitude: e.target.value })
                  }
                  className="p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                      text-gray-900 dark:text-gray-100 rounded-lg 
                      focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                      transition-all duration-200
                      hover:border-green-300 dark:hover:border-green-300/50"
                />
                <input
                  type="text"
                  placeholder="Longitude"
                  value={params.longitude || ""}
                  onChange={(e) =>
                    setParams({ ...params, longitude: e.target.value })
                  }
                  className="p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                      text-gray-900 dark:text-gray-100 rounded-lg 
                      focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                      transition-all duration-200
                      hover:border-green-300 dark:hover:border-green-300/50"
                />
              </div>
              <button
                onClick={getCurrentLocation}
                className="w-full mt-1 p-2 border border-gray-200 dark:border-gray-700
                            text-gray-700 dark:text-gray-300 rounded-lg
                            hover:border-green-300 dark:hover:border-green-300/50
                            hover:text-green-600 dark:hover:text-green-300
                            transition-all duration-200 font-medium
                            bg-white dark:bg-gray-800">
                <div className="flex items-center justify-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Use Current Location</span>
                </div>
              </button>
            </div>

            {/* Variable Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Variable Type
              </label>
              <div className="relative">
                <select
                  value={params.variable_type || ""}
                  onChange={(e) => {
                    // Clear any previously selected indices when changing variable type
                    const newParams = {
                      ...params,
                      variable_type: e.target.value,
                      temperature_index: "",
                      precipitation_index: "",
                    };
                    setParams(newParams);
                  }}
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                       text-gray-900 dark:text-gray-100 rounded-lg 
                       focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                       appearance-none transition-all duration-200
                       hover:border-green-300 dark:hover:border-green-300/50">
                  <option value="" disabled selected>
                    Select variable type
                  </option>
                  {variableTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="dark:bg-gray-800 dark:text-gray-100">
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                              text-gray-400 dark:text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Temperature Indices */}
            {params.variable_type === "Temperature" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Temperature Indices
                </label>
                <div className="relative">
                  <select
                    value={params.temperature_index || ""}
                    onChange={(e) => {
                      setParams({
                        ...params,
                        temperature_index: e.target.value,
                      });
                    }}
                    className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                         text-gray-900 dark:text-gray-100 rounded-lg 
                         focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                         appearance-none transition-all duration-200
                         hover:border-green-300 dark:hover:border-green-300/50">
                    <option value="" disabled selected>
                      Select temperature index
                    </option>
                    {temperatureIndices.map((index) => (
                      <option
                        key={index}
                        value={index}
                        className="dark:bg-gray-800 dark:text-gray-100">
                        {index}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                                text-gray-400 dark:text-gray-500 pointer-events-none"
                  />
                </div>
              </div>
            )}

            {/* Precipitation Indices */}
            {params.variable_type === "Precipitation" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Precipitation Indices
                </label>
                <div className="relative">
                  <select
                    value={params.precipitation_index || ""}
                    onChange={(e) => {
                      setParams({
                        ...params,
                        precipitation_index: e.target.value,
                      });
                    }}
                    className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                         text-gray-900 dark:text-gray-100 rounded-lg 
                         focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                         appearance-none transition-all duration-200
                         hover:border-green-300 dark:hover:border-green-300/50">
                    <option value="" disabled selected>
                      Select precipitation index
                    </option>
                    {precipitationIndices.map((index) => (
                      <option
                        key={index}
                        value={index}
                        className="dark:bg-gray-800 dark:text-gray-100">
                        {index}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                                text-gray-400 dark:text-gray-500 pointer-events-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Spatial Pattern Toggle */}
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Spatial Indices Pattern
              </label>
              <button
                onClick={() => {
                  setShowSpatialPattern(!showSpatialPattern);
                  // Trigger getData when toggling spatial pattern
                  getData();
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showSpatialPattern
                    ? "bg-green-300 dark:bg-green-300/90"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showSpatialPattern ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <button
              className="w-full p-3 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900
                         rounded-lg transition-all duration-200 font-medium
                         hover:bg-green-400 dark:hover:bg-green-300
                         focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                         shadow-sm hover:shadow-md">
              <div className="flex items-center justify-center">
                <Download className="mr-2 h-4 w-4" />
                <span>Download Report</span>
              </div>
            </button>
          </div>

          {/* Feedback button */}
          <button
            className="w-full p-3 border border-gray-200 dark:border-gray-700
                         text-gray-700 dark:text-gray-300 rounded-lg
                         hover:border-green-300 dark:hover:border-green-300/50
                         hover:text-green-600 dark:hover:text-green-300
                         transition-all duration-200 font-medium
                         focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                         bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/30 hover:shadow-md dark:hover:shadow-gray-600/40">
            <div className="flex items-center justify-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Send Feedback</span>
            </div>
          </button>
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
