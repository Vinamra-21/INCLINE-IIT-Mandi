import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Download,
  MapPin,
} from "lucide-react";

//@ts-expect-error
export function LeftPanel({ isPanelOpen, setIsPanelOpen }) {
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
          </div>

          {/* Get Current Location Button */}
          <button
            className="w-full p-3 bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300
                       rounded-lg transition-all duration-200 font-medium
                       hover:bg-blue-200 dark:hover:bg-blue-800/50
                       focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700/30
                       border border-blue-200 dark:border-blue-800/50">
            <div className="flex items-center justify-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>Fetch Current Location</span>
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
                         shadow-sm hover:shadow-md dark:shadow-gray-800/30">
              <div className="flex items-center justify-center">
                <span>Delineate</span>
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
                <span>Download Drought Data</span>
              </div>
            </button>

            <button
              className="w-full p-3 border border-gray-200 dark:border-gray-700
                               text-gray-700 dark:text-gray-300 rounded-lg
                               hover:border-green-300 dark:hover:border-green-300/50
                               hover:text-green-600 dark:hover:text-green-300
                               transition-all duration-200 font-medium
                               focus:ring-2 focus:ring-green-200 dark:focus:ring-green-300/50
                               bg-white dark:bg-gray-800 shadow-sm hover:shadow-md dark:shadow-gray-800/30">
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
