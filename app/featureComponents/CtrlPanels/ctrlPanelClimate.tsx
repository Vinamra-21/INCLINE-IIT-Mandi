import {
  Download,
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import React, { useState, useEffect } from "react";

// Parameter mappings
const paramMappings = {
  // Variable mappings
  climate_variable: {
    displayToApi: {
      Precipitation: "pr",
      "Maximum Temperature": "tasmax",
      "Minimum Temperature": "tasmin",
    },
    apiToDisplay: {
      pr: "Precipitation",
      tasmax: "Maximum temperature",
      tasmin: "Minimum Temperature",
    },
  },
  // Temporal scale mappings
  temporal_scale: {
    displayToApi: {
      Annual: "annual",
      Monthly: "monthly",
      Daily: "daily",
    },
    apiToDisplay: {
      annual: "Annual",
      monthly: "Monthly",
      daily: "Daily",
    },
  },
  // Spatial scale mappings
  spatial_scale: {
    displayToApi: {
      "India Average": "country_avg",
      District: "district",
      State: "state",
      Basin: "basin",
      Location: "location",
    },
    apiToDisplay: {
      country_avg: "India Average",
      district: "District",
      state: "State",
      basin: "Basin",
      location: "Location",
    },
  },
  // Model mappings
  climate_model: {
    displayToApi: {
      "Ensemble Mean": "EM_imd",
      ACCESS_CM2: "ACCESS_CM2",
      "CMCC-ESM2": "CMCC-ESM2",
      "INM-CM5-0": "INM-CM5-0",
      "MRI_ESM2-0": "MRI_ESM2-0",
      "NorESM2-MM": "NorESM2-MM",
      "ACCESS_ESM1-5": "ACCESS_ESM1-5",
      MIROC6: "MIROC6",
      NESM3: "NESM3",
      TaiESM1: "TaiESM1",
      "BCC_CSM2-MR": "BCC_CSM2-MR",
      "INM-CM4-8": "INM-CM4-8",
      "MPI_ESM1-2-LR": "MPI_ESM1-2-LR",
      "NorESM2-LM": "NorESM2-LM",
    },
    apiToDisplay: {
      EM_imd: "Ensemble Mean",
      ACCESS_CM2: "ACCESS_CM2",
      "CMCC-ESM2": "CMCC-ESM2",
      "INM-CM5-0": "INM-CM5-0",
      "MRI_ESM2-0": "MRI_ESM2-0",
      "NorESM2-MM": "NorESM2-MM",
      "ACCESS_ESM1-5": "ACCESS_ESM1-5",
      MIROC6: "MIROC6",
      NESM3: "NESM3",
      TaiESM1: "TaiESM1",
      "BCC_CSM2-MR": "BCC_CSM2-MR",
      "INM-CM4-8": "INM-CM4-8",
      "MPI_ESM1-2-LR": "MPI_ESM1-2-LR",
      "NorESM2-LM": "NorESM2-LM",
    },
  },
};

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
  // Climate panel options - Keep display names the same
  const climateVariables = [
    "Precipitation",
    "Maximum Temperature",
    "Minimum Temperature",
  ];
  const climateSpatialScales = [
    "India Average",
    "District",
    "State",
    "Basin",
    "Location",
  ];
  const climateTemporalScales = ["Annual", "Monthly", "Daily"];
  const climateModels = [
    "Ensemble Mean",
    "ACCESS_CM2",
    "CMCC-ESM2",
    "INM-CM5-0",
    "MRI_ESM2-0",
    "NorESM2-MM",
    "ACCESS_ESM1-5",
    "MIROC6",
    "NESM3",
    "TaiESM1",
    "BCC_CSM2-MR",
    "INM-CM4-8",
    "MPI_ESM1-2-LR",
    "NorESM2-LM",
  ];

  // State to store display values
  const [displayParams, setDisplayParams] = useState<Record<string, string>>(
    {}
  );

  // Initialize display parameters from API parameters
  useEffect(() => {
    const newDisplayParams: Record<string, string> = {};

    // Convert API parameters to display parameters
    for (const [key, value] of Object.entries(params)) {
      if (paramMappings[key] && paramMappings[key].apiToDisplay[value]) {
        newDisplayParams[key] = paramMappings[key].apiToDisplay[value];
      } else {
        newDisplayParams[key] = value;
      }
    }

    setDisplayParams(newDisplayParams);
  }, [params]);

  useEffect(() => {
    const defaultDisplayParams = {
      climate_variable: "Precipitation",
      spatial_scale: "India Average",
      temporal_scale: "Annual",
      climate_model: "Ensemble Mean",
    };

    const defaultApiParams: Record<string, string> = {};
    let hasChanges = false;

    // Convert display defaults to API values and check if params need updating
    for (const [key, displayValue] of Object.entries(defaultDisplayParams)) {
      if (!params[key]) {
        // Convert display value to API value
        const apiValue =
          paramMappings[key]?.displayToApi[displayValue] || displayValue;
        defaultApiParams[key] = apiValue;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      // Update with API values but keep any existing params
      setParams({ ...params, ...defaultApiParams });

      // Also update display params for only the missing parameters
      const newDisplayParams = { ...displayParams };
      for (const [key, value] of Object.entries(defaultDisplayParams)) {
        if (!displayParams[key]) {
          newDisplayParams[key] = value;
        }
      }
      setDisplayParams(newDisplayParams);
    }
  }, []);

  // Fix for handleParamChange to prevent unwanted temporal_scale changes

  const handleParamChange = (paramType: string, displayValue: string) => {
    // Update display params
    setDisplayParams({
      ...displayParams,
      [paramType]: displayValue,
    });

    // Convert to API value for backend
    const apiValue =
      paramMappings[paramType]?.displayToApi[displayValue] || displayValue;

    // Create a complete updated params object
    const updatedParams = {
      ...params,
      [paramType]: apiValue,
    };

    // If climate_variable changes, update the variable field too
    if (paramType === "climate_variable") {
      updatedParams.variable = apiValue;
    }

    // Special handling for location spatial scale
    if (paramType === "spatial_scale" && displayValue === "Location") {
      // Make sure we have valid coordinates
      if (!params.latitude || !params.longitude) {
        updatedParams.latitude = "31.7754";
        updatedParams.longitude = "76.9861";
      }
      // IMPORTANT: Do NOT change temporal_scale here
    }

    // Set the updated params
    setParams(updatedParams);

    // Directly call getData without delay - this removes the setTimeout
    getData();
  };

  const renderCoordinateInputs = () => {
    if (displayParams.spatial_scale === "Location") {
      return (
        <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Latitude
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="Latitude"
                value={params.latitude || ""}
                onChange={(e) => {
                  const newParams = { ...params, latitude: e.target.value };
                  setParams(newParams);
                }}
                onBlur={() => {
                  // Fetch data when user finishes editing coordinates
                  getData();
                }}
                className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                          text-gray-900 dark:text-gray-100 rounded-lg 
                          focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                          transition-all duration-200
                          hover:border-green-300 dark:hover:border-green-300/50
                          placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Longitude
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="Longitude"
                value={params.longitude || ""}
                onChange={(e) => {
                  const newParams = { ...params, longitude: e.target.value };
                  setParams(newParams);
                }}
                onBlur={() => {
                  // Fetch data when user finishes editing coordinates
                  getData();
                }}
                className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                          text-gray-900 dark:text-gray-100 rounded-lg 
                          focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                          transition-all duration-200
                          hover:border-green-300 dark:hover:border-green-300/50
                          placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Click on the map to set coordinates
          </p>
        </div>
      );
    }
    return null;
  };

  const handleDownload = () => {};

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
                  Climate Data Controls
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Configure your climate data view
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Climate Variable Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Climate Variable
              </label>
              <div className="relative">
                <select
                  value={displayParams.climate_variable || ""}
                  onChange={(e) =>
                    handleParamChange("climate_variable", e.target.value)
                  }
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                       text-gray-900 dark:text-gray-100 rounded-lg 
                       focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                       appearance-none transition-all duration-200
                       hover:border-green-300 dark:hover:border-green-300/50">
                  {climateVariables.map((variable) => (
                    <option
                      key={variable}
                      value={variable}
                      className="dark:bg-gray-800 dark:text-gray-100">
                      {variable}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                              text-gray-400 dark:text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Temporal Scale Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Temporal Scale
              </label>
              <div className="relative">
                <select
                  value={displayParams.temporal_scale || ""}
                  onChange={(e) =>
                    handleParamChange("temporal_scale", e.target.value)
                  }
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                       text-gray-900 dark:text-gray-100 rounded-lg 
                       focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                       appearance-none transition-all duration-200
                       hover:border-green-300 dark:hover:border-green-300/50">
                  {climateTemporalScales.map((scale) => (
                    <option
                      key={scale}
                      value={scale}
                      className="dark:bg-gray-800 dark:text-gray-100">
                      {scale}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                              text-gray-400 dark:text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Spatial Scale Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Spatial Scale
              </label>
              <div className="relative">
                <select
                  value={displayParams.spatial_scale || ""}
                  onChange={(e) =>
                    handleParamChange("spatial_scale", e.target.value)
                  }
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                       text-gray-900 dark:text-gray-100 rounded-lg 
                       focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                       appearance-none transition-all duration-200
                       hover:border-green-300 dark:hover:border-green-300/50">
                  {climateSpatialScales.map((scale) => (
                    <option
                      key={scale}
                      value={scale}
                      className="dark:bg-gray-800 dark:text-gray-100">
                      {scale}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                              text-gray-400 dark:text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Render coordinates if location is selected */}
            {renderCoordinateInputs()}

            {/* Model Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Climate Model
              </label>
              <div className="relative">
                <select
                  value={displayParams.climate_model || ""}
                  onChange={(e) =>
                    handleParamChange("climate_model", e.target.value)
                  }
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                       text-gray-900 dark:text-gray-100 rounded-lg 
                       focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                       appearance-none transition-all duration-200
                       hover:border-green-300 dark:hover:border-green-300/50">
                  {climateModels.map((model) => (
                    <option
                      key={model}
                      value={model}
                      className="dark:bg-gray-800 dark:text-gray-100">
                      {model}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                              text-gray-400 dark:text-gray-500 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6 ">
            <button
              onClick={handleDownload}
              className="w-full p-3 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900
                         rounded-lg transition-all duration-200 font-medium
                         hover:bg-green-400 dark:hover:bg-green-300
                         focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                         shadow-sm hover:shadow-md">
              <div className="flex items-center justify-center">
                <Download className="mr-4 h-4 w-4" />
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
