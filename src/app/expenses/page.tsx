import { createClient } from "@/utils/server";
import ExpensesClient from "./ExpensesClient";

export default async function Page() {
  const supabase = await createClient();
  
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  return <ExpensesClient initialTransactions={transactions || []} />;
}