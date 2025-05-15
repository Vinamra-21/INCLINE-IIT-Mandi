import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useEffect, useState } from "react";

// Define the component props type
interface GraphComponentProps {
  data?: any[];
  temporal_scale?: string;
  locationInfo?: {
    type: string;
    lat?: string;
    lng?: string;
  };
  featureProperties?: any; // Add this property to receive feature data
  variable?: string; // Add variable prop to show in y-axis label
}

const GraphComponent: React.FC<GraphComponentProps> = ({
  data = [],
  temporal_scale = "annual",
  locationInfo = { type: "point", lat: "9.917", lng: "78.119" },
  featureProperties = null,
  variable = "pr", // Default to precipitation
}) => {
  const [locationName, setLocationName] = useState("");
  const [chartData, setChartData] = useState([]);
  const [visibleSeries, setVisibleSeries] = useState({
    hist: true,
    observed: true,
    ssp245: true,
    ssp585: true,
  });

  // Get formatted variable name for the y-axis label
  const getYAxisLabel = () => {
    // Map variable codes to their full names and units
    const variableMap = {
      pr: "Precipitation (mm)",
      tasmax: "Maximum Temperature (°C)",
      tasmin: "Minimum Temperature (°C)",
    };

    // Return the mapped name or a default if not found
    return variableMap[variable.toLowerCase()] || `${variable} value`;
  };

  // Process the data when it changes
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setChartData(data);
    } else {
      setChartData([]);
    }
  }, [data]);

  // Handle location name based on spatial scale and properties
  useEffect(() => {
    const getLocationName = async () => {
      // Default name if we can't determine it
      let name = "Unknown Location";

      if (!locationInfo) {
        setLocationName(name);
        return;
      }

      // Handle different spatial scales
      switch (locationInfo.type) {
        case "basin":
          // Get basin name from feature properties
          if (featureProperties) {
            if (featureProperties.BA_NAME) {
              name = featureProperties.BA_NAME;
            } else {
              name = "Selected Basin";
            }
          } else {
            name = "Basin Region";
          }
          break;

        case "district":
          // Get district name from feature properties
          if (featureProperties) {
            if (featureProperties.distname) {
              name = featureProperties.distname;
            } else {
              name = "Selected District";
            }
          } else {
            name = "District Region";
          }
          break;

        case "state":
          // Get state name from feature properties
          if (featureProperties) {
            if (featureProperties.Name) {
              name = featureProperties.Name;
            } else {
              name = "Selected State";
            }
          } else {
            name = "State Region";
          }
          break;

        case "india":
          name = "India";
          break;

        case "location":
        default:
          // Only do reverse geocoding if we have lat/lng
          if (locationInfo.lat && locationInfo.lng) {
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${locationInfo.lat}&lon=${locationInfo.lng}&zoom=10`,
                {
                  headers: {
                    Accept: "application/json",
                    "User-Agent": "INCLINE_App/1.0",
                  },
                }
              );

              if (!response.ok) {
                throw new Error("Geocoding request failed");
              }

              const data = await response.json();

              if (data.display_name) {
                // Extract just the main part (town/city and state)
                const parts = data.display_name.split(", ");
                if (parts.length >= 3) {
                  // Use the first part (locality) and one of the state parts
                  name = `${parts[0]}, ${parts[parts.length - 3]}`;
                } else {
                  name = data.display_name.split(",").slice(0, 2).join(",");
                }
              } else {
                name = `Coordinates: ${locationInfo.lat}, ${locationInfo.lng}`;
              }
            } catch (error) {
              console.error("Error fetching place name:", error);
              name = `Coordinates: ${locationInfo.lat}, ${locationInfo.lng}`;
            }
          }
          break;
      }

      setLocationName(name);
    };

    getLocationName();
  }, [locationInfo, featureProperties]);

  const toggleSeries = (series) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [series]: !prev[series],
    }));
  };

  // Modified formatXAxis to always show year only
  const formatXAxis = (tickItem) => {
    if (!tickItem) return "";

    // Handle the format in your data which is YYYY-MM-DD
    try {
      const date = new Date(tickItem);
      // Always return just the year regardless of temporal scale
      return date.getFullYear();
    } catch (error) {
      console.error("Error formatting date:", error);
      return tickItem;
    }
  };

  // Determine if we should use bar chart based on temporal scale
  const useBarChart =
    temporal_scale === "daily" || temporal_scale === "monthly";

  // Check if we have actual data
  const hasData = Array.isArray(chartData) && chartData.length > 0;

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 pb-6 mb-12 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-black text-md p-2 rounded">{locationName}</h2>
      </div>

      {/* Only show these buttons for annual data */}
      {hasData && (
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => toggleSeries("hist")}
            className={`px-3 py-1 rounded text-white ${
              visibleSeries.hist ? "bg-orange-500" : "bg-gray-400"
            }`}>
            Hist(Mod)
          </button>
          <button
            onClick={() => toggleSeries("observed")}
            className={`px-3 py-1 rounded text-white ${
              visibleSeries.observed ? "bg-red-500" : "bg-gray-400"
            }`}>
            Hist(Obs)
          </button>
          <button
            onClick={() => toggleSeries("ssp245")}
            className={`px-3 py-1 rounded text-white ${
              visibleSeries.ssp245 ? "bg-green-500" : "bg-gray-400"
            }`}>
            SSP 2.45
          </button>
          <button
            onClick={() => toggleSeries("ssp585")}
            className={`px-3 py-1 rounded text-white ${
              visibleSeries.ssp585 ? "bg-blue-500" : "bg-gray-400"
            }`}>
            SSP 5.85
          </button>
        </div>
      )}

      <div className="flex-grow p-2">
        {hasData ? (
          <ResponsiveContainer width="100%" height={400}>
            {useBarChart ? (
              // Bar Chart for monthly or daily data
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickFormatter={formatXAxis}
                  label={{
                    value: "Year",
                    position: "insideBottom",
                    offset: -10,
                    dy: 20,
                  }}
                />
                <YAxis
                  label={{
                    value: getYAxisLabel(),
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  labelFormatter={(label) => {
                    try {
                      const date = new Date(label);
                      return temporal_scale === "monthly"
                        ? `${date.toLocaleString("default", {
                            month: "long",
                          })} ${date.getFullYear()}`
                        : `${date.toLocaleDateString()}`;
                    } catch (error) {
                      return label;
                    }
                  }}
                  formatter={(value, name) => {
                    // Map data keys to readable names
                    const nameMapping = {
                      hist: "Hist(Mod)",
                      observed: "Hist(Obs)",
                      ssp245: "SSP2-4.5",
                      ssp585: "SSP5-8.5",
                    };

                    // Get the readable name or use the original if not found
                    const readableName = nameMapping[name] || name;

                    return [
                      value ? `${value.toFixed(2)} mm` : "No data",
                      readableName,
                    ];
                  }}
                />
                {/* Legend removed */}
                {visibleSeries.hist && (
                  <Bar
                    dataKey="hist"
                    fill="#ED8936"
                    name="Hist(Mod)"
                    minPointSize={2}
                  />
                )}
                {visibleSeries.observed && (
                  <Bar
                    dataKey="observed"
                    fill="#E53E3E"
                    name="Hist(Obs)"
                    minPointSize={2}
                  />
                )}
                {visibleSeries.ssp245 && (
                  <Bar
                    dataKey="ssp245"
                    fill="#38A169"
                    name="SSP2-4.5"
                    minPointSize={2}
                  />
                )}
                {visibleSeries.ssp585 && (
                  <Bar
                    dataKey="ssp585"
                    fill="#3182CE"
                    name="SSP5-8.5"
                    minPointSize={2}
                  />
                )}
              </BarChart>
            ) : (
              // Line Chart for annual data
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickFormatter={formatXAxis}
                  label={{
                    value: "Year",
                    position: "insideBottom",
                    offset: -10,
                    dy: 20,
                  }}
                />
                <YAxis
                  label={{
                    value: getYAxisLabel(),
                    angle: -90,
                    position: "insideLeft",
                    offset: -10,
                    dy: 60,
                  }}
                />
                <Tooltip
                  labelFormatter={(label) => {
                    try {
                      const date = new Date(label);
                      return temporal_scale === "monthly"
                        ? `${date.toLocaleString("default", {
                            month: "long",
                          })} ${date.getFullYear()}`
                        : `${date.toLocaleDateString()}`;
                    } catch (error) {
                      return label;
                    }
                  }}
                  formatter={(value, name) => {
                    // Map data keys to readable names
                    const nameMapping = {
                      hist: "Hist(Mod)",
                      observed: "Hist(Obs)",
                      ssp245: "SSP2-4.5",
                      ssp585: "SSP5-8.5",
                    };

                    // Get the readable name or use the original if not found
                    const readableName = nameMapping[name] || name;

                    return [
                      value ? `${value.toFixed(2)} mm` : "No data",
                      readableName,
                    ];
                  }}
                />
                {/* Legend removed */}
                {visibleSeries.hist && (
                  <Line
                    type="monotone"
                    dataKey="hist"
                    stroke="#ED8936"
                    name="Hist(Mod)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                {visibleSeries.observed && (
                  <Line
                    type="monotone"
                    dataKey="observed"
                    stroke="#E53E3E"
                    name="Hist(Obs)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                {visibleSeries.ssp245 && (
                  <Line
                    type="monotone"
                    dataKey="ssp245"
                    stroke="#38A169"
                    name="SSP2-4.5"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                {visibleSeries.ssp585 && (
                  <Line
                    type="monotone"
                    dataKey="ssp585"
                    stroke="#3182CE"
                    name="SSP5-8.5"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
              </LineChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500">
              No data available for the selected parameters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphComponent;
