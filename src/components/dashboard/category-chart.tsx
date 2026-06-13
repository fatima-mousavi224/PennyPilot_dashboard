
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Transaction } from "@/types/database";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Link from "next/link"; // For empty state CTA

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#CB7DFE",
  Transport: "#FF8080",
  Entertainment: "#FFA206",
  Other: "#84DBE3",
  School: "#80E388",
};

interface CategoryChartProps {
  data?: Transaction[] ; 
}

export const CategoryChart = ({ data = [] }: CategoryChartProps) => {
  const processedData = data.reduce((acc: any[], curr) => {
    const categoryName =
      curr.category.charAt(0).toUpperCase() + curr.category.slice(1);

    const existing = acc.find((item) => item.name === categoryName);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({
        name: categoryName,
        value: curr.amount,
        color: CATEGORY_COLORS[categoryName] || CATEGORY_COLORS["Other"],
      });
    }
    return acc;
  }, []);

  const chartData = processedData.length > 0 ? processedData : [];

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-secondary h3 pb-4">Spending by Category</h3>

      <div className="bg-surface-cards border border-border rounded-[5px] p-6 flex-1 flex flex-col justify-between shadow-[0_0_20px_rgba(119,0,255,0.15)]">
        {data.length > 0 ? (
          <>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value: any) => `RM ${Number(value).toFixed(2)}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-y-3 gap-x-2">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center my-auto py-6">
            <span className="text-2xl mb-2">🍕</span>
            <p className="text-sm font-semibold text-white mb-1">Categories Empty</p>
            <p className="text-xs text-gray-500 max-w-50">
              Your category breakdown chart will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
