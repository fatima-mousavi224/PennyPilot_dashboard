import { DollarSign, List, Calendar } from "lucide-react";

interface ExpenseStatsProps {
  total: number;
  count: number;
  avg: number;
}

export const ExpenseStats = ({ total, count, avg }: ExpenseStatsProps) => {
  const stats = [
    {
      title: "Total spent this month",
      value: `RM ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: <DollarSign className="text-[#80E388]" size={20} />,
      bg: "bg-[#002303]",
    },
    {
      title: "Total Transactions",
      value: count.toString(),
      icon: <List className="text-[#FF8080]" size={20} />,
      bg: "bg-[#460000]",
    },
    {
      title: "Average per Day",
      value: `RM ${avg.toFixed(2)}`,
      icon: <Calendar className="text-[#FFA206]" size={20} />,
      bg: "bg-[#2A1A00]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className="bg-surface-cards border border-border p-6 rounded-[5px] shadow-sm shadow-[#7700FF38] flex items-center gap-4"
        >
          <div className={`${stat.bg} p-3 rounded-[5px]`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-secondary body mb-1">{stat.title}</p>
            <p className="text-primary h3 pt-2">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};