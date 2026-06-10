// import { SummaryGrid } from "@/components/dashboard/summary-grid";
// import HeadLine from "../ui/HeadLine";
// import { CategoryChart } from "../dashboard/category-chart";
// import { SpendingChart } from "../dashboard/spending-chart";
// import { AICoach } from "../dashboard/ai-coach";
// import RecentTransactions from "../dashboard/recent-transactions";

// export default function DashboardPage() {
//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14  py-6 flex flex-col gap-8 pt-16">
//       {/* Welcome Message */}
//       <div>
//         <h1 className="h3 text-primary">Good morning, Tauedea</h1>
//         <p className="body text-secondary pt-2">
//           Here is your spending summary for May 2026
//         </p>
//       </div>

//       {/* Step 1 & 2: The Summary Grid */}
//       <SummaryGrid />

//       {/* head line */}
//       <HeadLine title="Expense Charts" />

//       {/* Placeholder for Next Steps (Charts) */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Takes up 2 columns on desktop */}
//         <div className="lg:col-span-2">
//           <SpendingChart />
//         </div>

//         {/* Takes up 1 column on desktop */}
//         <div className="lg:col-span-1">
//           <CategoryChart />
//         </div>
//       </div>

//       {/* ------------ */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//         {/* Left Column: AI Coach */}
//         <div className="lg:col-span-1">
//           <AICoach />
//         </div>

//         {/* Right Column: Recent Transactions */}
//         <div className="lg:col-span-2">
//           <RecentTransactions />
//         </div>
//       </div>
//     </main>
//   );
// }


import { SummaryGrid } from "@/components/dashboard/summary-grid";
import HeadLine from "../ui/HeadLine";
import { CategoryChart } from "../dashboard/category-chart";
import { SpendingChart } from "../dashboard/spending-chart";
import { AICoach } from "../dashboard/ai-coach";
import RecentTransactions from "../dashboard/recent-transactions";
import { createClient } from "@/utils/client";
import { Transaction } from "@/types/database";

export default async function DashboardPage() {
  // 1. Create the Supabase client
  const supabase = await createClient();

  // 2. Fetch all transactions for calculations
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false }) as { data: Transaction[] | null};

  // 3. Simple calculation for the Summary Grid
  const totalSpent = transactions?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-6 flex flex-col gap-8 pt-16">
      {/* Welcome Message */}
      <div>
        <h1 className="h3 text-primary">Good morning, Tauedea</h1>
        <p className="body text-secondary pt-2">
          Here is your spending summary for May 2026
        </p>
      </div>

      {/* Passing real data to the Summary Grid */}
      <SummaryGrid totalAmount={totalSpent} count={transactions?.length || 0} />

      {/* head line */}
      <HeadLine title="Expense Charts" />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpendingChart data={transactions || []} />
        </div>
        <div className="lg:col-span-1">
          <CategoryChart data={transactions || []} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1">
          <AICoach data={transactions} />
        </div>
        <div className="lg:col-span-2">
          {/* We pass the data we already fetched to save a database call */}
          <RecentTransactions initialData={transactions?.slice(0, 5)} />
        </div>
      </div>
    </main>
  );
}