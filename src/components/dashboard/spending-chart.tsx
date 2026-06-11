

"use client";

import { Transaction } from "@/types/database";
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

interface SpendingChartProps {
  data?: Transaction[]; 
}

export const SpendingChart = ({ data = [] }: SpendingChartProps) => {
  const chartData = data.length > 0 
    ? data.map(item => ({
        day: new Date(item.date).getDate().toString(),
        amount: item.amount
      })).reverse() 
    : [];

  return (
    <div>
      <h3 className="text-secondary h3 pb-4">Spending this Month</h3>
      <div className="bg-surface-cards border border-border rounded-[5px] p-6 h-full shadow-[0_0_20px_rgba(119,0,255,0.15)]">
        <div className="h-62.5 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData.length > 0 ? chartData : []}>
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
                {chartData.map((entry, index) => (
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