import { SummaryGrid } from "@/components/dashboard/summary-grid";
import HeadLine from "../ui/HeadLine";
import { CategoryChart } from "../dashboard/category-chart";
import { SpendingChart } from "../dashboard/spending-chart";
import { AICoach } from "../dashboard/ai-coach";
import RecentTransactions from "../dashboard/recent-transactions";
import { createClient } from "@/utils/server"; 
import { Transaction } from "@/types/database";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const fullName = user?.user_metadata?.full_name;
  const firstName = fullName ? fullName.split(" ")[0] : null;
  const greetingText = firstName ? `Welcome back, ${firstName}` : "Welcome to PennyPilot";

  let transactions: Transaction[] = [];
  
  if (user) {
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });
      
    transactions = (data as Transaction[]) || [];
  }

  const totalSpent = transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-6 flex flex-col gap-8 pt-16">
      <div className="border-b-[1.5px] border-border pb-8">
        <h1 className="h3 text-primary tracking-tight font-bold">
          {greetingText}
        </h1>
        <p className="body text-secondary pt-2" suppressHydrationWarning>
          Here is your spending summary for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <SummaryGrid totalAmount={totalSpent} count={transactions.length} />

      <HeadLine title="Expense Charts" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpendingChart data={transactions} />
        </div>
        <div className="lg:col-span-1">
          <CategoryChart data={transactions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1">
          <AICoach data={transactions} />
        </div>
        <div className="lg:col-span-2 h-full">
          <RecentTransactions initialData={transactions.slice(0, 5)} />
        </div>
      </div>
    </main>
  );
}