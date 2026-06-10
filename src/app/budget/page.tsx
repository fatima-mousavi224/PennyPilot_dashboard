import BudgetClient from "@/components/budget/BudgetClient";
import { createClient } from "@/utils/server";

export default async function BudgetPage() {
  const supabase = await createClient();

  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { data: budgets } = await supabase.from("budgets").select("*");

  const { data: transactions } = await supabase
    .from("transactions")
    .select("amount, category, date")
    .gte("date", firstDay); 

  const dynamicBudgets = (budgets || []).map((budget) => {
    const totalSpent = (transactions || [])
      .filter((t) => t.category.trim().toLowerCase() === budget.category.trim().toLowerCase())
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      ...budget,
      spent_amount: totalSpent,
    };
  });

  return <BudgetClient initialBudgets={dynamicBudgets} />;
}