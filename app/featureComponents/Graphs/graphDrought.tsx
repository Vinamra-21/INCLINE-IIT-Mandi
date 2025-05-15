import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
import React, { useState, useEffect } from "react";

interface DroughtDataPoint {
  time: string;
  spi?: number;
  spei?: number;
  ndvi?: number;
}

interface GraphComponentProps {
  data?: DroughtDataPoint[];
  temporalScale?: string;
  variable?: string;
  locationName?: string;
  locationInfo?: {
    type: string;
    lat?: string;
    lng?: string;
  };
  featureProperties?: any;
}

const GraphComponent: React.FC<GraphComponentProps> = ({
  data = [],
  temporalScale = "1-month",
  variable = "spi",
  locationName,
  locationInfo = { type: "point" },
  featureProperties = null,
}) => {
  const [displayLocationName, setDisplayLocationName] = useState(
    locationName || ""
  );

  // Handle location name based on spatial scale and properties
  useEffect(() => {
    const getLocationName = async () => {
      // Use provided locationName if available
      if (locationName) {
        setDisplayLocationName(locationName);
        return;
      }

      // Default name if we can't determine it
      let name = "Unknown Location";

      if (!locationInfo) {
        setDisplayLocationName(name);
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

      setDisplayLocationName(name);
    };

    getLocationName();
  }, [locationInfo, featureProperties, locationName]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    // Only display year for cleaner x-axis
    return date.getFullYear().toString();
  };

  // Function to format y-axis tick values to 2 decimal places
  const formatYAxisTick = (value: number) => {
    return value.toFixed(2);
  };

  // Determine y-axis domain based on variable
  const getDomain = () => {
    if (variable.toLowerCase() === "ndvi") {
      return [0, 1];
    }
    return [-2.5, 2.5];
  };

  // Determine which reference lines to show based on variable
  const renderReferenceLines = () => {
    if (variable.toLowerCase() === "ndvi") {
      return (
        <>
          <ReferenceLine y={0.3} stroke="#FBBF24" strokeDasharray="3 3" />
          <ReferenceLine y={0.1} stroke="#EF4444" strokeDasharray="3 3" />
        </>
      );
    }
    return (
      <>
        <ReferenceLine y={0} stroke="#E5E7EB" />
        <ReferenceLine y={-1} stroke="#FBBF24" strokeDasharray="3 3" />
        <ReferenceLine y={-2} stroke="#EF4444" strokeDasharray="3 3" />
      </>
    );
  };

  // Get line color based on variable
  const getLineColor = (dataKey: string) => {
    switch (dataKey.toLowerCase()) {
      case "spi":
        return "#3B82F6"; // blue
      case "spei":
        return "#10B981"; // green
      case "ndvi":
        return "#8B5CF6"; // purple
      default:
        return "#3B82F6";
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-gray-800 p-4 pb-6 mb-12 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-black dark:text-white text-md p-2 rounded">
          {displayLocationName}
        </h2>
      </div>

      {/* Removed the separate heading for variable and temporal scale */}

      <div className="flex-grow h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 35, bottom: 35 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.3}
            />
            <XAxis
              dataKey="time"
              tickFormatter={formatDate}
              minTickGap={40}
              height={50}
              stroke="#888">
              <Label
                value={`Year `}
                position="bottom"
                offset={15}
                style={{
                  textAnchor: "middle",
                  fill: "#666",
                  fontSize: "0.9em",
                }}
              />
            </XAxis>
            <YAxis
              domain={getDomain()}
              tickCount={7}
              width={80}
              stroke="#888"
              padding={{ top: 10, bottom: 10 }}
              tickMargin={8}
              tickFormatter={formatYAxisTick}>
              <Label
                value={`${variable.toUpperCase()}${
                  variable.toLowerCase() === "ndvi"
                    ? ""
                    : ` - ${temporalScale} month`
                }`}
                angle={-90}
                position="middle"
                dx={-60}
              />
            </YAxis>

            {renderReferenceLines()}

            <Tooltip
              labelFormatter={(time) => {
                const date = new Date(time as string);
                return date.toLocaleDateString("default", {
                  month: "long",
                  year: "numeric",
                });
              }}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />

            {/* Render lines only for data that exists */}
            {data.some((d) => d.spi !== undefined) && (
              <Line
                type="monotone"
                dataKey="spi"
                stroke={getLineColor("spi")}
                strokeWidth={2.5}
                dot={{ r: 0 }}
                activeDot={{ r: 5 }}
                name="SPI"
                connectNulls={true}
              />
            )}

            {data.some((d) => d.spei !== undefined) && (
              <Line
                type="monotone"
                dataKey="spei"
                stroke={getLineColor("spei")}
                strokeWidth={2.5}
                dot={{ r: 0 }}
                activeDot={{ r: 5 }}
                name="SPEI"
                connectNulls={true}
              />
            )}

            {data.some((d) => d.ndvi !== undefined) && (
              <Line
                type="monotone"
                dataKey="ndvi"
                stroke={getLineColor("ndvi")}
                strokeWidth={2.5}
                dot={{ r: 0 }}
                activeDot={{ r: 5 }}
                name="NDVI"
                connectNulls={true}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphComponent;
