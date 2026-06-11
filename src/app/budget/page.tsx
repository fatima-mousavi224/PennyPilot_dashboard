import BudgetClient from "@/components/budget/BudgetClient";
import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";

export default async function BudgetPage() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { data: budgets } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id); 

  const { data: transactions } = await supabase
    .from("transactions")
    .select("amount, category, date")
    .eq("user_id", user.id) 
    .gte("date", firstDay); 

  const dynamicBudgets = (budgets || []).map((budget) => {
    const totalSpent = (transactions || [])
      .filter((t) => t.category?.trim().toLowerCase() === budget.category?.trim().toLowerCase())
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      ...budget,
      spent_amount: totalSpent,
    };
  });

  return <BudgetClient initialBudgets={dynamicBudgets} />;
}