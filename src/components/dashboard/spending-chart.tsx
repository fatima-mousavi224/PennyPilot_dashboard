"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { day: "1", amount: 40 },
  { day: "3", amount: 70 },
  { day: "5", amount: 110 },
  { day: "7", amount: 30 },
  { day: "9", amount: 85 },
  { day: "11", amount: 150 },
  { day: "13", amount: 55 },
  { day: "15", amount: 90 },
  { day: "17", amount: 20 },
  { day: "19", amount: 75 },
  { day: "20", amount: 60 },
  { day: "21", amount: 130 }, 
  { day: "22", amount: 45 },
];

export const SpendingChart = () => {
  return (
    <div>
      <h3 className="text-secondary h3 pb-4">Spending this Month</h3>
      <div className="bg-surface-cards border border-border rounded-[5px] p-6 h-full shadow-md shadow-[#7700FF38]">
        <div className="h-62.5 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f2937"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 16 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border p-2 rounded shadow-md">
                        <p className="text-primary text-xs">{`RM ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.amount > 100
                        ? "#EF4444"
                        : entry.amount > 60
                          ? "#F59E0B"
                          : "#22C55E"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
