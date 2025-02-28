import { Download, ChevronDown } from "lucide-react";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

//@ts-expect-error
export function LeftPanelDrought({ isPanelOpen, setIsPanelOpen }) {
  return (
    <>
      {isPanelOpen ? (
        <div className="relative h-full p-4 space-y-2 bg-white dark:bg-gray-800 overflow-y-auto overflow-x-hidden">
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 translate-x-1/2 z-10">
            {isPanelOpen ? (
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-50" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-50" />
            )}
          </button>

          <div className="relative mb-4 text-center">
            <div className="flex items-center justify-center mb-1"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Drought Monitor
            </h2>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Spatial pattern of drought
              </p>
              <div className="relative inline-block w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="absolute right-0 w-8 h-6 bg-white dark:bg-gray-600 rounded-full shadow-md flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300">
                  OFF
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 pb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
              Drought Index
            </h3>
            <div className="relative">
              <select
                className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                           text-gray-900 dark:text-gray-100 rounded-lg 
                           focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                           appearance-none transition-all duration-200
                           hover:border-green-300 dark:hover:border-green-300/50">
                <option value="spi" selected>
                  SPI
                </option>
                <option value="pdsi">PDSI</option>
                <option value="spei">SPEI</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                          text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 pb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
              Spatial Scale
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                className="p-2 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900 rounded-lg 
                         focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50
                         transition-all duration-200 font-medium
                         hover:bg-green-400 dark:hover:bg-green-300">
                Location
              </button>
              <button
                className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg 
                         border border-gray-200 dark:border-gray-700
                         hover:border-green-300 dark:hover:border-green-300/50
                         hover:text-green-600 dark:hover:text-green-300
                         focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                         transition-all duration-200 font-medium">
                State
              </button>
              <button
                className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg 
                         border border-gray-200 dark:border-gray-700
                         hover:border-green-300 dark:hover:border-green-300/50
                         hover:text-green-600 dark:hover:text-green-300
                         focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                         transition-all duration-200 font-medium">
                District
              </button>
              <button
                className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg 
                         border border-gray-200 dark:border-gray-700
                         hover:border-green-300 dark:hover:border-green-300/50
                         hover:text-green-600 dark:hover:text-green-300
                         focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                         transition-all duration-200 font-medium">
                Basin
              </button>
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
                  value="31.78"
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
                  value="71.99"
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
                className="px-4 py-1.5 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900 rounded-lg 
                         focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50
                         transition-all duration-200 font-medium
                         hover:bg-green-400 dark:hover:bg-green-300 shadow-sm hover:shadow-md">
                Submit
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 pb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
              Scale
            </h3>
            <div className="relative mb-4">
              <select
                className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                           text-gray-900 dark:text-gray-100 rounded-lg 
                           focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                           appearance-none transition-all duration-200
                           hover:border-green-300 dark:hover:border-green-300/50">
                <option value="1month" selected>
                  1-month
                </option>
                <option value="3month">3-month</option>
                <option value="6month">6-month</option>
                <option value="12month">12-month</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                          text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>

            <div className="flex justify-center">
              <button
                className="w-full p-3 bg-green-300 dark:bg-green-300/90 text-gray-800 dark:text-gray-900
                           rounded-lg transition-all duration-200 font-medium
                           hover:bg-green-400 dark:hover:bg-green-300
                           focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                           shadow-sm hover:shadow-md">
                <div className="flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Data</span>
                </div>
              </button>
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
