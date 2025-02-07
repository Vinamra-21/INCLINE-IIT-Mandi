"use client";
// import { useEffect } from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer } from "react-leaflet";
// import L from "leaflet";
const weatherData = [
  { day: "Monday", temp: 22 },
  { day: "Tuesday", temp: 27 },
  { day: "Wednesday", temp: 23 },
  { day: "Thursday", temp: 30 },
  { day: "Friday", temp: 25 },
];

export default function WeatherDashboard() {
  // useEffect(() => {
  //   // Fix Leaflet icon paths
  //   delete L.Icon.Default.prototype._getIconUrl;
  //   L.Icon.Default.mergeOptions({
  //     iconRetinaUrl:
  //       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  //     iconUrl:
  //       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  //     shadowUrl:
  //       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  //   });
  // }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar */}
        <div className="bg-gray-800/50 rounded-xl p-4 space-y-4">
          <div className="space-y-2">
            <input
              type="search"
              placeholder="Search location..."
              className="w-full bg-gray-700/50 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div className="relative h-100">
            <div className="absolute inset-0 bg-[url('map.png')] bg-cover bg-center rounded-lg opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20 rounded-lg" />
            <div className="relative p-4">
              <h3 className="font-medium">Global Weather</h3>
              <p className="text-sm text-gray-300">Real-time updates</p>
            </div>
          </div>
          {/* <div className="relative h-[200px] rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              <MapContainer
                center={[20, 0]}
                zoom={1}
                className="h-full w-full"
                zoomControl={false}
                attributionControl={false}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  className="dark-map"
                />
              </MapContainer>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20" />
            <div className="relative p-4">
              <h3 className="font-medium">Global Weather</h3>
              <p className="text-sm text-gray-300">Real-time updates</p>
            </div>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="bg-gray-800/50 rounded-xl p-6 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-6xl font-light">13°</div>
              <h1 className="text-2xl mt-2">Stormy</h1>
              <p className="text-gray-400">with partly cloudy</p>
            </div>
            <div className="flex gap-3">
              <Cloud className="w-6 h-6 text-gray-400" />
              <CloudRain className="w-6 h-6 text-gray-400" />
              <Wind className="w-6 h-6 text-gray-400" />
              <Sun className="w-6 h-6 text-gray-400" />
              <Droplets className="w-6 h-6 text-gray-400" />
            </div>
          </div>

          {/* Weather Graph */}
          <div className="h-[200px] mt-8">
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
                  stroke="#374151"
                />
                <XAxis
                  dataKey="day"
                  stroke="#4B5563"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#9CA3AF" }}
                />
                <YAxis
                  stroke="#4B5563"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°`}
                  tick={{ fill: "#9CA3AF" }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-lg">
                          <p className="text-gray-400">{label}</p>
                          <p className="text-white font-medium">{`${payload[0].value}°`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  fill="url(#colorTemp)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: "#60A5FA",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Forecast */}
          <div className="grid grid-cols-5 gap-4 pt-4">
            {weatherData.map((day) => (
              <div key={day.day} className="text-center">
                <p className="text-gray-400 text-sm">{day.day}</p>
                <Cloud className="w-6 h-6 mx-auto my-2 text-gray-400" />
                <p className="text-lg">{day.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
