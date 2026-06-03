import { SummaryGrid } from "@/components/dashboard/summary-grid";
import HeadLine from "../ui/HeadLine";
import { CategoryChart } from "../dashboard/category-chart";
import { SpendingChart } from "../dashboard/spending-chart";
import { RecentTransactions } from "../dashboard/recent-transactions";
import { AICoach } from "../dashboard/ai-coach";

export default function DashboardPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14  py-6 flex flex-col gap-8 pt-16">
      {/* Welcome Message */}
      <div>
        <h1 className="h3 text-primary">Good morning, Tauedea</h1>
        <p className="body text-secondary pt-2">
          Here is your spending summary for May 2026
        </p>
      </div>

      {/* Step 1 & 2: The Summary Grid */}
      <SummaryGrid />

      {/* head line */}
      <HeadLine title="Expense Charts" />

      {/* Placeholder for Next Steps (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Takes up 2 columns on desktop */}
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>

        {/* Takes up 1 column on desktop */}
        <div className="lg:col-span-1">
          <CategoryChart />
        </div>
      </div>

      {/* ------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column: AI Coach */}
        <div className="lg:col-span-1">
          <AICoach />
        </div>

        {/* Right Column: Recent Transactions */}
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
      </div>
    </main>
  );
}
