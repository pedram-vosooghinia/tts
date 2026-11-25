"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "شنبه", sales: 12 },
  { day: "یکشنبه", sales: 19 },
  { day: "دوشنبه", sales: 15 },
  { day: "سه‌شنبه", sales: 28 },
  { day: "چهارشنبه", sales: 23 },
  { day: "پنجشنبه", sales: 36 },
  { day: "جمعه", sales: 31 },
];

export function DashboardChart() {
  return (
    <div className="h-[280px] w-full" dir="ltr">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7950D8" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#7950D8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#F0EDF4"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9995A5", fontSize: 11 }}
            tickMargin={12}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9995A5", fontSize: 11 }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #ECE9F2",
              fontSize: 12,
            }}
            formatter={(value) => [`${value} میلیون تومان`, "فروش"]}
          />

          <Area
            type="monotone"
            dataKey="sales"
            stroke="#7950D8"
            strokeWidth={2.5}
            fill="url(#salesGradient)"
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
