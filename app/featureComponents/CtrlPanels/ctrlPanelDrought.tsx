import {
  Download,
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
  // Available variables and spatial scales
  const availVariables = ["spi", "spei", "ndvi"];
  const availSpatialScales = ["district", "state", "basin", "location"];

  const [showSpatialPattern, setShowSpatialPattern] = useState(false);

  // Set default values only when component mounts and only for missing values
  useEffect(() => {
    const defaultParams = {
      variable: "spi",
      spatial_scale: "location",
      time_scale: "1",
      latitude: "31.78",
      longitude: "76.99",
    };

    // Only apply defaults for missing values
    const updatedParams = { ...defaultParams };
    let hasChanges = false;

    // Only set parameters that don't already exist
    Object.keys(defaultParams).forEach((key) => {
      if (!params[key]) {
        updatedParams[key] = defaultParams[key];
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setParams({ ...params, ...updatedParams });
    }
  }, []); // Only run once on mount

  // Function to update params and automatically apply changes
  const updateParams = (newParams: Record<string, string>) => {
    // Create a new object with all existing parameters
    const updatedParams = { ...params };

    // Only update the specific parameters that were changed
    Object.keys(newParams).forEach((key) => {
      updatedParams[key] = newParams[key];
    });

    // Update the parameters
    setParams(updatedParams);

    // Automatically apply changes after state is updated
    setTimeout(() => getData(), 0);
  };
  const handleDownload = () => {};

  return (
    <>
      {isPanelOpen ? (
        <div className="relative h-full p-4 space-y-2 bg-white dark:bg-gray-900 overflow-y-scroll overflow-x-hidden">
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 translate-x-1/2 z-10  ">
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
                  Drought Analysis
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Configure your analysis parameters
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Variable Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Variable
              </label>
              <div className="relative">
                <select
                  value={params.variable || "spi"}
                  onChange={(e) => {
                    updateParams({ variable: e.target.value });
                  }}
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                                 text-gray-900 dark:text-gray-100 rounded-lg 
                                 focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                                 appearance-none transition-all duration-200
                                 hover:border-green-300 dark:hover:border-green-300/50">
                  {availVariables.map((variable) => (
                    <option key={variable} value={variable}>
                      {variable.toUpperCase()}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                                        text-gray-400 dark:text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Spatial Scale */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Spatial Scale
              </label>
              <div className="relative">
                <select
                  value={params.spatial_scale || "location"}
                  onChange={(e) => {
                    updateParams({ spatial_scale: e.target.value });
                  }}
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                                 text-gray-900 dark:text-gray-100 rounded-lg 
                                 focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                                 appearance-none transition-all duration-200
                                 hover:border-green-300 dark:hover:border-green-300/50">
                  {availSpatialScales.map((scale) => (
                    <option key={scale} value={scale}>
                      {scale.charAt(0).toUpperCase() + scale.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                                        text-gray-400 dark:text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {(params.spatial_scale || "location") === "location" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Coordinates
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Latitude"
                      value={params.latitude || "31.78"}
                      onChange={(e) => {
                        updateParams({ latitude: e.target.value });
                      }}
                      className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                                     text-gray-900 dark:text-gray-100 rounded-lg 
                                     focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                                     transition-all duration-200
                                     hover:border-green-300 dark:hover:border-green-300/50"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Longitude"
                      value={params.longitude || "76.99"}
                      onChange={(e) => {
                        updateParams({ longitude: e.target.value });
                      }}
                      className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                                     text-gray-900 dark:text-gray-100 rounded-lg 
                                     focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                                     transition-all duration-200
                                     hover:border-green-300 dark:hover:border-green-300/50"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Click on the map to set coordinates
                </p>
              </div>
            )}

            {/* Scale Selection - Only show for SPI and SPEI */}
            {params.variable !== "ndvi" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Time Scale
                </label>
                <div className="relative">
                  <select
                    value={params.time_scale || "1"}
                    onChange={(e) => {
                      updateParams({ time_scale: e.target.value });
                    }}
                    className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                                   text-gray-900 dark:text-gray-100 rounded-lg 
                                   focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                                   appearance-none transition-all duration-200
                                   hover:border-green-300 dark:hover:border-green-300/50">
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                                          text-gray-400 dark:text-gray-500 pointer-events-none"
                  />
                </div>
              </div>
            )}

            {/* Spatial Drought Pattern Toggle */}
            <div className="pt-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Spatial Drought Pattern
                </label>
                <button
                  onClick={() => {
                    const newValue = !showSpatialPattern;
                    setShowSpatialPattern(newValue);
                    // You might want to add pattern-related params here and call getData
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
          </div>

          <div className="space-y-3 pt-6">
            <button
              onClick={handleDownload}
              className="w-full p-3 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900
                               rounded-lg transition-all duration-200 font-medium
                               hover:bg-green-400 dark:hover:bg-green-300
                               focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                               shadow-sm dark:shadow-gray-700/30 hover:shadow-md dark:hover:shadow-gray-600/40">
              <div className="flex items-center justify-center">
                <Download className="mr-2 h-4 w-4" />
                <span>Download Data</span>
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
