"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Food", value: 480, color: "#CB7DFE" },
  { name: "Transport", value: 200, color: "#FF8080" },
  { name: "Entertainment", value: 300, color: "#FFA206" },
  { name: "Other", value: 150, color: "#84DBE3" },
  { name: "School", value: 80, color: "#80E388" }
];

export const CategoryChart = () => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-secondary h3 pb-4">Spending by Category</h3>
      
      <div className="bg-surface-cards border border-border rounded-[5px] p-6 flex-1 flex flex-col justify-between shadow-md shadow-[#7700FF38]">
        
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                cx="50%"
                cy="50%"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#111", border: "none", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-y-3 gap-x-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-400">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};