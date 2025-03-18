import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DroughtData } from "./types";

interface GraphComponentProps {
  data?: Record<string, number>[];
}
const GraphComponent = ({ data = [] }: GraphComponentProps) => {


  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Drought Index Values
        </h2>
        <p className="text-gray-600 mt-1">
          Time series of drought index values
        </p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tick={{ fill: "#4B5563" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              tick={{ fill: "#4B5563" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                padding: "12px",
              }}
              itemStyle={{
                color: "#111827",
                fontSize: "14px",
              }}
              labelStyle={{
                color: "#6B7280",
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />
            <Line
              type="monotone"
              dataKey={data[0] ? Object.keys(data[0])[1] : ""}
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6", strokeWidth: 1, r: 1 }}
              activeDot={{ r: 3, fill: "#2563EB" }}
              name="Value"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphComponent;
