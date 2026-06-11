import { StatCard } from "./stat-card";
import {
  CircleDollarSign,
  PiggyBank,
  ChartBarStacked,
  CalendarDays,
} from "lucide-react";

interface SummaryGridProps {
  totalAmount: number;
  count: number;
  budgetLimit?: number;      
  biggestCategoryName?: string; 
  biggestCategoryAmount?: number; 
  daysLeft?: number;        
}

export const SummaryGrid = ({
  totalAmount,
  count,
  budgetLimit = 0, 
  biggestCategoryName = "None",
  biggestCategoryAmount = 0,
  daysLeft = 1,
}: SummaryGridProps) => {

  const remainingBudget = Math.max(0, budgetLimit - totalAmount);
  
  const dailyRemaining = remainingBudget > 0 ? (remainingBudget / daysLeft) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      <StatCard
        title="Monthly Spending"
        value={`RM ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        subtext={totalAmount > 0 ? "+ 12% vs last month" : "No expenses logged yet"}
        subtextType={totalAmount > 0 ? "danger" : "success"}
        icon={
          <CircleDollarSign
            className="h-8 p-1.5 w-8 text-[#FF9E9E] bg-[#460000] rounded-[5px]"
          />
        }
      />

      <StatCard
        title="Budget Remaining"
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
        value={biggestCategoryAmount > 0 ? biggestCategoryName : "None"}
        subtext={
          biggestCategoryAmount > 0 
            ? `RM ${biggestCategoryAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} this month`
            : "No active expenses yet"
        }
        icon={
          <ChartBarStacked
            className="h-8 p-1.5 w-8 text-[#84DBE3] bg-[#001D3B] rounded-[5px]"
          />
        }
      />

      <StatCard
        title="Days Left"
        value={`${daysLeft} days`}
        subtext={`RM ${dailyRemaining.toFixed(2)}/day remaining`}
        icon={
          <CalendarDays
            className="h-8 p-1.5 w-8 text-[#80E388] bg-[#002303] rounded-[5px]"
          />
        }
      />
    </div>
  );
};