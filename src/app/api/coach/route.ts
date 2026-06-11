/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/utils/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized access token" }, { status: 401 });
  }

  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  const currentMonthYearLabel = `Analyzing ${monthName} ${year}`;

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysLeft = Math.max(1, lastDay.getDate() - now.getDate());

  try {
    const { data: budgets, error: budgetErr } = await supabase
      .from("budgets")
      .select("*")
      .eq("user_id", user.id); 
    if (budgetErr) throw budgetErr;

    const { data: transactions, error: txErr } = await supabase
      .from("transactions")
      .select("amount, category")
      .eq("user_id", user.id) 
      .gte("date", firstDay);
    if (txErr) throw txErr;

    const totalBudget = (budgets || []).reduce((acc, b) => acc + (b.limit_amount || 0), 0);
    const totalSpent = (transactions || []).reduce((acc, t) => acc + (t.amount || 0), 0);
    const budgetStatusText = totalBudget > 0 ? `${Math.round((totalSpent / totalBudget) * 100)}% used` : "0% used";
    const remainingBudgetPool = Math.max(0, totalBudget - totalSpent);

    const categoryTotals: { [key: string]: number } = {};
    (transactions || []).forEach(t => {
      const cat = t.category?.trim().toLowerCase() || "other";
      categoryTotals[cat] = (categoryTotals[cat] || 0) + (t.amount || 0);
    });

    let topCategoryRaw = "None";
    let maxSpent = 0;
    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      if (amt > maxSpent) {
        maxSpent = amt;
        topCategoryRaw = cat;
      }
    });
    const topCategory = topCategoryRaw.charAt(0).toUpperCase() + topCategoryRaw.slice(1);

    const mockInsights = [];

    if (budgets && budgets.length > 0) {
      budgets.forEach(b => {
        const catNameRaw = b.category?.trim() || "Other";
        const catNameLower = catNameRaw.toLowerCase();
        const catNameFormatted = catNameRaw.charAt(0).toUpperCase() + catNameRaw.slice(1).toLowerCase();
        
        const spent = categoryTotals[catNameLower] || 0;
        const limit = b.limit_amount || 0;

        if (limit > 0) {
          const percentUsed = (spent / limit) * 100;

          if (percentUsed >= 100) {
            mockInsights.push({
              type: "danger",
              message: `${catNameFormatted} budget completely exhausted! You've spent RM ${spent} over your RM ${limit} allowance. freeze variable expenses here.`,
              badge: "High Risk"
            });
          } else if (percentUsed >= 85) {
            mockInsights.push({
              type: "warning",
              message: `${catNameFormatted} spending is critical. You have used ${Math.round(percentUsed)}% (RM ${spent} of RM ${limit}) with ${daysLeft} days left.`,
              badge: "Watch Out"
            });
          } else if (percentUsed > 0) {
            mockInsights.push({
              type: "success",
              message: `${catNameFormatted} spending is healthy. You've used ${Math.round(percentUsed)}% of your RM ${limit} budget tracker. Keep it up!`,
              badge: "On Track"
            });
          } else {
            mockInsights.push({
              type: "info",
              message: `No transactions logged for ${catNameFormatted} yet. Your RM ${limit} allocation is fully clear and preserved.`,
              badge: "On Track"
            });
          }
        }
      });
    }

    const dailyLimitSuggestion = (remainingBudgetPool / daysLeft).toFixed(2);
    mockInsights.push({
      type: "info",
      message: totalSpent >= totalBudget 
        ? `Tip to stay track: Total limits exceeded. Try to freeze non-essential costs entirely for the remaining ${daysLeft} days.`
        : `Tip to stay track: Try to keep your average daily spend under RM ${dailyLimitSuggestion} for the remaining ${daysLeft} days to finish the month within budget.`,
      badge: "Suggestion"
    });

    const { data, error: insertError } = await supabase
      .from("ai_coaching")
      .insert([{
        user_id: user.id, 
        insights: mockInsights,
        total_spent: totalSpent,
        budget_status: budgetStatusText,
        days_left: daysLeft,
        meta_month: currentMonthYearLabel,
        meta_top_category: topCategory,
        meta_remaining_amount: remainingBudgetPool
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json(data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Database Query error" }, { status: 500 });
  }
}