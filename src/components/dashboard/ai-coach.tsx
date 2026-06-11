import HeadLine from "../ui/HeadLine";
import { InsightCard } from "./insight-card";
import { RefreshCcw, Sparkles } from "lucide-react";
import { Transaction } from "@/types/database";

interface AICoachProps {
  data: Transaction[] | null;
}

export const AICoach = ({ data = [] }: AICoachProps) => {
  const transactions = data || [];
  
  const totalSpent = transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  
  const categoryTotals: { [key: string]: number } = {};
  transactions.forEach((t) => {
    const cat = t.category?.trim().toLowerCase() || "other";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + (t.amount || 0);
  });

  let biggestCategoryName = "None";
  let biggestCategoryAmount = 0;

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > biggestCategoryAmount) {
      biggestCategoryAmount = amount;
      biggestCategoryName = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter
    }
  });

  const budgetLimit = 2000;
  const isOverBudgetRisk = totalSpent > (budgetLimit * 0.8);
  
  const hasExpenses = totalSpent > 0;

  return (
    <div>
      <HeadLine title="AI Insights" />
      <div className="bg-surface-cards border border-border rounded-[5px] p-6 h-full mt-8 shadow-[0_0_20px_rgba(119,0,255,0.15)]">
        <div className="flex justify-between items-center mb-9">
          <div className="flex items-center gap-1">
            <Sparkles className="h-5 w-5 text-[#699BCD]" />
            <h3 className="h3 text-primary">AI Spending Coach</h3>
          </div>
          <p className="body text-primary py-1 px-3 rounded-full bg-blue hover:bg-hover">AI</p>
        </div>

        <div className="flex flex-col gap-4">
          {hasExpenses ? (
            <>
              <InsightCard
                type="warning"
                text={`You've spent RM ${biggestCategoryAmount.toFixed(2)} on ${biggestCategoryName} so far. This is your highest expense category this month.`}
              />
              
              <InsightCard
                type={isOverBudgetRisk ? "warning" : "success"}
                text={isOverBudgetRisk 
                  ? `Careful! You've used ${((totalSpent / budgetLimit) * 100).toFixed(0)}% of your budget. Slow down to last until the end of the month.`
                  : "Great job! You are currently under your budget limit and spending at a sustainable pace."
                }
              />

              <InsightCard
                type="tip"
                text={`You have recorded ${transactions.length} transactions this month. Keep tracking to maintain a clear financial overview.`}
              />
            </>
          ) : (
            <>
              <InsightCard
                type="tip"
                text="Welcome to your financial clean slate! You haven't recorded any expenses yet this month."
              />
              <InsightCard
                type="success"
                text="Your budget parameters are perfectly secure. Head over to the Expenses tab to add your first transaction whenever you're ready!"
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-2 mt-6 py-2 px-4 rounded-3xl hover:bg-white/5 border border-secondary w-max cursor-pointer transition-colors">
          <p className="text-primary body">Regenerate Insights</p> 
          <span><RefreshCcw size={18} className="text-primary"/></span>
        </div>
      </div>
    </div>
  );
};