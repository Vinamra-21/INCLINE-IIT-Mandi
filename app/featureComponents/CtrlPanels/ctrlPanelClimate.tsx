import { Download, MessageSquare, ChevronDown } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function LeftPanel({ isPanelOpen, setIsPanelOpen }) {
  // State to track selected spatial scale
  const [selectedSpatialScale, setSelectedSpatialScale] = useState("");

  // Climate data options
  const avail_variables = [
    "precipitation",
    "maximum temperature",
    "minimum Temperature",
  ];
  const avail_temporal_scales = ["annual", "monthly", "daily"];
  const avail_spatial_scales = [
    "India Average",
    "district",
    "state",
    "basin",
    "location",
  ];
  const avail_models = [
    "ACCESS_CM2",
    "CMCC-ESM2",
    "INM-CM5-0",
    "MRI_ESM2-0",
    "NorESM2-MM",
    "india_avg_imdaa",
    "ACCESS_ESM1-5",
    "EM_imd",
    "MIROC6",
    "NESM3",
    "TaiESM1",
    "observed",
    "BCC_CSM2-MR",
    "INM-CM4-8",
    "MPI_ESM1-2-LR",
    "NorESM2-LM",
    "india_avg_imd",
  ];

  // Handle spatial scale change
  const handleSpatialScaleChange = (e) => {
    setSelectedSpatialScale(e.target.value);
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
                  Climate Data Controls
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Configure your climate data view
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Variable Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Climate Variable
              </label>
              <div className="relative">
                <select
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                               text-gray-900 dark:text-gray-100 rounded-lg 
                               focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                               appearance-none transition-all duration-200
                               hover:border-green-300 dark:hover:border-green-300/50">
                  <option value="" disabled selected>
                    Select variable
                  </option>
                  {avail_variables.map((variable) => (
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
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                               text-gray-900 dark:text-gray-100 rounded-lg 
                               focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                               appearance-none transition-all duration-200
                               hover:border-green-300 dark:hover:border-green-300/50">
                  <option value="" disabled selected>
                    Select temporal scale
                  </option>
                  {avail_temporal_scales.map((scale) => (
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
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                               text-gray-900 dark:text-gray-100 rounded-lg 
                               focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                               appearance-none transition-all duration-200
                               hover:border-green-300 dark:hover:border-green-300/50"
                  onChange={handleSpatialScaleChange}
                  value={selectedSpatialScale}>
                  <option value="" disabled selected>
                    Select spatial scale
                  </option>
                  {avail_spatial_scales.map((scale) => (
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

            {/* Location Inputs (conditional) */}
            {selectedSpatialScale === "location" && (
              <div className="space-y-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    placeholder="Enter latitude (e.g., 20.5937)"
                    className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                                 text-gray-900 dark:text-gray-100 rounded-lg 
                                 focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                                 transition-all duration-200
                                 hover:border-green-300 dark:hover:border-green-300/50
                                 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    placeholder="Enter longitude (e.g., 78.9629)"
                    className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                                 text-gray-900 dark:text-gray-100 rounded-lg 
                                 focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                                 transition-all duration-200
                                 hover:border-green-300 dark:hover:border-green-300/50
                                 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>
            )}

            {/* Model Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Climate Model
              </label>
              <div className="relative">
                <select
                  className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                               text-gray-900 dark:text-gray-100 rounded-lg 
                               focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                               appearance-none transition-all duration-200
                               hover:border-green-300 dark:hover:border-green-300/50">
                  <option value="" disabled selected>
                    Select climate model
                  </option>
                  {avail_models.map((model) => (
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

          <div className="space-y-3 pt-6">
            <button
              className="w-full p-3 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900
                             rounded-lg transition-all duration-200 font-medium
                             hover:bg-green-400 dark:hover:bg-green-300
                             focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                             shadow-sm hover:shadow-md">
              <div className="flex items-center justify-center">
                <Download className="mr-2 h-4 w-4" />
                <span>Download Climate Data</span>
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
                <span>Request Additional Data</span>
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
