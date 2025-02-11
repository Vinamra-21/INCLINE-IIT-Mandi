import { Download, MessageSquare, ChevronDown } from "lucide-react";

export function LeftPanel() {
  return (
    <div className="p-6 space-y-6">
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Dashboard Controls
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Configure your view preferences
        </p>
      </div>

      {/* Select Groups */}
      <div className="space-y-4">
        {/* Select 1 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Primary Selection
          </label>
          <div className="relative">
            <select
              className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                             text-gray-900 dark:text-gray-100 rounded-lg 
                             focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                             appearance-none transition-all duration-200
                             hover:border-green-300 dark:hover:border-green-300/50">
              <option value="" disabled selected>
                Select option 1
              </option>
              <option value="option1">Analytics View</option>
              <option value="option2">Performance Metrics</option>
              <option value="option3">Custom Dashboard</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                                  text-gray-400 dark:text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Select 2 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Time Range
          </label>
          <div className="relative">
            <select
              className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                             text-gray-900 dark:text-gray-100 rounded-lg 
                             focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                             appearance-none transition-all duration-200
                             hover:border-green-300 dark:hover:border-green-300/50">
              <option value="" disabled selected>
                Select option 2
              </option>
              <option value="option1">Last 24 Hours</option>
              <option value="option2">Past Week</option>
              <option value="option3">Past Month</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                                  text-gray-400 dark:text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Select 3 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Data Type
          </label>
          <div className="relative">
            <select
              className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                             text-gray-900 dark:text-gray-100 rounded-lg 
                             focus:ring-2 focus:ring-green-300 dark:focus:ring-green-300/50 focus:border-transparent
                             appearance-none transition-all duration-200
                             hover:border-green-300 dark:hover:border-green-300/50">
              <option value="" disabled selected>
                Select option 3
              </option>
              <option value="option1">Raw Data</option>
              <option value="option2">Aggregated</option>
              <option value="option3">Processed</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                                  text-gray-400 dark:text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
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
  );
}
