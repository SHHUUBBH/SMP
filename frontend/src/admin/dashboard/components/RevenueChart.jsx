import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import revenueData from "../data/revenueData";

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={revenueData}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          stroke="#2b3142"
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="day"
          stroke="#8c95a8"
        />

        <YAxis
          stroke="#8c95a8"
        />

        <Tooltip
          contentStyle={{
            background: "#121621",
            border: "1px solid #30384a",
            borderRadius: "12px",
            color: "#fff",
          }}
        />

        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#d92d20"
          strokeWidth={4}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}