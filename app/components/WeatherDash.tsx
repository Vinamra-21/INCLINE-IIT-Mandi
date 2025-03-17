"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { MapPin } from "lucide-react";
import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const MapContent = lazy(() => import("./HomeMap"));

const weatherData = [
  { day: "1980", temp: 22 },
  { day: "2000", temp: 27 },
  { day: "2020", temp: 23 },
  { day: "2040", temp: 30 },
  { day: "2060", temp: 25 },
  { day: "2080", temp: 25 },
  { day: "2100", temp: 25 },
];
const heads = [
  {
    index: 1,
    temperature: "13°",
    condition: "Stormy",
    description: "with partly cloudy",
  },
  {
    index: 2,
    temperature: "25°",
    condition: "Sunny",
    description: "Clear sky",
  },
  {
    index: 3,
    temperature: "18°",
    condition: "Rainy",
    description: "Light showers",
  },
];

export default function WeatherDashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2 sm:p-4 md:p-6 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(250px,300px)_1fr] gap-4 md:gap-6">
        {/* Sidebar */}
        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-3 md:p-4 space-y-3 md:space-y-4 transition-colors">
          <div className="space-y-2">
            <input
              type="search"
              placeholder="Search location..."
              className="w-full bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Current Location Section */}
          <div className="bg-gray-200/50 dark:bg-gray-700/30 rounded-lg p-2 md:p-3 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 dark:bg-blue-500/20 p-2 rounded-lg transition-colors">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Current Location</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  New York, USA
                </p>
              </div>
            </div>
          </div>

          {/* Map Section with Title */}
          <div className="space-y-2">
            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden">
              {mapLoaded && (
                <Suspense
                  fallback={
                    <div className="h-full w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm">
                      Loading map...
                    </div>
                  }>
                  <MapContent />
                </Suspense>
              )}
            </div>
            <div className="flex items-center justify-between px-1">
              <h3 className="font-medium text-sm md:text-md">Global Weather</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Real-time updates
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 md:p-6 space-y-4 transition-colors">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex justify-center gap-3 items-center w-full">
              {heads.map((item) => (
                <div
                  key={item.index}
                  className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <div className="text-3xl sm:text-4xl md:text-6xl font-light">
                    {item.temperature}
                  </div>
                  <h1 className="text-md sm:text-xl mt-2 font-medium">
                    {item.condition}
                  </h1>
                  <p className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            {/* <div className="flex flex-wrap gap-2 sm:gap-3">
              {["Button 1", "Button 2", "Button 3", "Button 4"].map((label) => (
                <button
                  key={label}
                  className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors">
                  {label}
                </button>
              ))}
            </div> */}
          </div>

          {/* Time Range Buttons */}
          <div className="flex flex-wrap justify-end gap-2">
            {["Day", "Week", "Month", "Year"].map((label) => (
              <button
                key={label}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors">
                {label}
              </button>
            ))}
          </div>

          {/* Weather Graph */}
          <div className="h-[200px] sm:h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weatherData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-700"
                />
                <XAxis
                  dataKey="day"
                  stroke="currentColor"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  className="text-gray-600 dark:text-gray-400"
                />
                <YAxis
                  stroke="currentColor"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°`}
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  className="text-gray-600 dark:text-gray-400"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {label}
                          </p>
                          <p className="text-gray-900 dark:text-white font-medium">{`${payload[0].value}°`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#16a34a"
                  strokeWidth={2}
                  fill="url(#colorTemp)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: "#16a34a",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
