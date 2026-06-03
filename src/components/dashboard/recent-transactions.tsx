import HeadLine from "../ui/HeadLine";
import { TransactionItem } from "./transaction-item";

const transactions = [
  { id: "1", name: "Burger King", date: "9 May 2026", category: "Food", amount: 18.50, type: "food" },
  { id: "2", name: "LRT - Bukit Jalil", date: "9 May 2026", category: "Transport", amount: 3.20, type: "transport" },
  { id: "3", name: "Stationary - Calculator", date: "8 May 2026", category: "School", amount: 75.00, type: "school" },
  { id: "4", name: "Netflix Subscription", date: "7 May 2026", category: "Entertainment", amount: 45.00, type: "entertainment" },
  { id: "5", name: "Shopee Order", date: "6 May 2026", category: "Other", amount: 17.90, type: "other" },
];

export const RecentTransactions = () => {
  return (
    <div>
        <HeadLine title="Recent Transactions"/>
    <div className="bg-surface-cards border border-border rounded-[5px] p-6 h-full shadow-md shadow-[#7700FF38] mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-primary h3">Recent Transactions</h3>
        <button className="small text-blue hover:text-hover hover:underline">View all →</button>
      </div>

      <div className="flex flex-col">
        {transactions.map((t) => (
          <TransactionItem key={t.id} {...t} />
        ))}
      </div>
    </div>
    </div>
  );
};