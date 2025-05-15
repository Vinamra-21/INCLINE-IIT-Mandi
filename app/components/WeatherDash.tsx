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
    description: "Precipitation",
  },
  {
    index: 2,
    temperature: "25°",
    condition: "Sunny",
    description: "TMax",
  },
  {
    index: 3,
    temperature: "18°",
    condition: "Rainy",
    description: "TMin",
  },
];

export default function WeatherDashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [location, setLocation] = useState({
    name: "Mandi,India",
    coordinates: [31.7087, 76.932],
    zoom: 5,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const handleMapLocationUpdate = async (coordinates) => {
    try {
      // Optional: Reverse geocode to get location name
      // This is a placeholder - replace with actual reverse geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[0]}&lon=${coordinates[1]}`
      );
      const data = await response.json();

      setLocation({
        name:
          data.display_name ||
          `${coordinates[0].toFixed(4)}, ${coordinates[1].toFixed(4)}`,
        coordinates: coordinates,
        zoom: 10,
      });

      // Here you would also fetch weather or other data for this location
      // fetchWeatherData(coordinates);
    } catch (error) {
      console.error("Error with reverse geocoding:", error);
      setLocation({
        name: `${coordinates[0].toFixed(4)}, ${coordinates[1].toFixed(4)}`,
        coordinates: coordinates,
        zoom: 10,
      });
    }
  };

  // Function to handle location search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      // You would replace this with your actual geocoding API
      const response = await fetch(
        `https://api.example.com/geocode?address=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();

      if (data && data.results && data.results.length > 0) {
        const result = data.results[0];
        setLocation({
          name: result.formatted_address,
          coordinates: [
            result.geometry.location.lat,
            result.geometry.location.lng,
          ],
          zoom: 12,
        });
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  // Function to get current user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Optional: Reverse geocode to get location name
          fetch(
            `https://api.example.com/reverse-geocode?lat=${latitude}&lng=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              setLocation({
                name: data.formatted_address || "Current Location",
                coordinates: [latitude, longitude],
                zoom: 14,
              });
            })
            .catch((error) => {
              console.error("Error with reverse geocoding:", error);
              setLocation({
                name: "Current Location",
                coordinates: [latitude, longitude],
                zoom: 14,
              });
            });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2 sm:p-4 md:p-6 w-full min-h-screen flex flex-col transition-colors">
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-[minmax(250px,350px)_1fr] gap-4 md:gap-6 xl:gap-8 flex-grow">
        {/* Sidebar */}
        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-3 md:p-4 flex flex-col space-y-3 md:space-y-4 transition-colors">
          <form onSubmit={handleSearch} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="search"
                placeholder="Search location..."
                className="w-full bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-3 py-2 text-sm transition-colors">
                Search
              </button>
            </div>
          </form>

          {/* Current Location Section */}
          <div className="bg-gray-200/50 dark:bg-gray-700/30 rounded-lg p-2 md:p-3 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-500/20 p-2 rounded-lg transition-colors">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Current Location</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {location.name}
                  </p>
                </div>
              </div>
              <button
                onClick={getUserLocation}
                className="text-xs bg-green-100 hover:bg-green-200 dark:bg-green-700/30 dark:hover:bg-green-700/50 text-green-800 dark:text-green-200 px-2 py-1 rounded transition-colors">
                Get Location
              </button>
            </div>
          </div>

          {/* Map Section with Title */}
          <div className="space-y-2 flex-grow flex flex-col">
            <div className="relative flex-grow rounded-lg overflow-hidden z-0">
              {mapLoaded && (
                <Suspense
                  fallback={
                    <div className="h-full w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm">
                      Loading map...
                    </div>
                  }>
                  <MapContent
                    center={location.coordinates}
                    zoom={location.zoom}
                    pinLocation={location.coordinates}
                    onLocationUpdate={handleMapLocationUpdate}
                  />
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
        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 md:p-6 flex flex-col space-y-4 transition-colors">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex justify-center gap-3 items-center w-full">
              {heads.map((item) => (
                <div
                  key={item.index}
                  className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex-1">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">
                    {item.temperature}
                  </div>
                  <h1 className="text-md sm:text-lg lg:text-xl mt-2 font-medium">
                    {item.condition}
                  </h1>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Time Range Buttons */}
          <div className="flex flex-wrap justify-end gap-2">
            {["Hist(Mod)", "Hist(Obs)", "SSP 2.45", "SSP 5.85"].map((label) => (
              <button
                key={label}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors">
                {label}
              </button>
            ))}
          </div>

          {/* Weather Graph */}
          <div className="h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px]">
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
