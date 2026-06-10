// import { StatCard } from "./stat-card";
// import { CircleDollarSign, PiggyBank, ChartBarStacked, CalendarDays } from "lucide-react";

// export const SummaryGrid = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
//       <StatCard 
//         title="Monthly Spending"
//         value="RM 1,421"
//         subtext="+ 12% vs last month"
//         subtextType="danger"
//         icon={<CircleDollarSign size={5} className="h-8 p-1.5 w-8 text-[#FF9E9E] bg-[#460000] rounded-[5px]" />}
//       />
//       <StatCard 
//         title="Budget Remaining"
//         value="RM 579"
//         subtext="of RM 2,000 limit"
//         subtextType="success"
//         icon={<PiggyBank size={5} className="h-8 p-1.5 w-8 text-[#B772E5] bg-[#2A0046] rounded-[5px]" />}
//       />
//       <StatCard 
//         title="Biggest Category"
//         value="Food"
//         subtext="RM 480 this month"
//         icon={<ChartBarStacked size={5} className="h-8 p-1.5 w-8 text-[#84DBE3] bg-[#001D3B] rounded-[5px]" />}
//       />
//       <StatCard 
//         title="Days Left"
//         value="8 days"
//         subtext="RM 72/day remaining"
//         icon={<CalendarDays size={5} className="h-8 p-1.5 w-8 text-[#80E388] bg-[#002303] rounded-[5px]" />}
//       />
//     </div>
//   );
// };


import { StatCard } from "./stat-card";
import {
  CircleDollarSign,
  PiggyBank,
  ChartBarStacked,
  CalendarDays,
} from "lucide-react";

export const SummaryGrid = ({
  totalAmount,
  count,
}: {
  totalAmount: number;
  count: number;
}) => {
  // Logic: Calculate remaining budget (Real Project logic)
  const budgetLimit = 2000;
  const remainingBudget = budgetLimit - totalAmount;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      <StatCard
        title="Monthly Spending"
        value={`RM ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        subtext="+ 12% vs last month"
        subtextType="danger"
        icon={
          <CircleDollarSign
            className="h-8 p-1.5 w-8 text-[#FF9E9E] bg-[#460000] rounded-[5px]"
          />
        }
      />
      <StatCard
        title="Budget Remaining"
        // FIXED: Now shows (Budget - Spending) instead of just Spending
        value={`RM ${remainingBudget.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        subtext={`of RM ${budgetLimit.toLocaleString()} limit`}
        subtextType="success"
        icon={
          <PiggyBank
            className="h-8 p-1.5 w-8 text-[#B772E5] bg-[#2A0046] rounded-[5px]"
          />
        }
      />
      <StatCard
        title="Biggest Category"
        value="Food"
        subtext="RM 480 this month"
        icon={
          <ChartBarStacked
            className="h-8 p-1.5 w-8 text-[#84DBE3] bg-[#001D3B] rounded-[5px]"
          />
        }
      />
      <StatCard
        title="Days Left"
        value="8 days"
        subtext="RM 72/day remaining"
        icon={
          <CalendarDays
            className="h-8 p-1.5 w-8 text-[#80E388] bg-[#002303] rounded-[5px]"
          />
        }
      />
    </div>
  );
};