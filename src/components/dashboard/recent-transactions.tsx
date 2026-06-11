
import { TransactionItem } from "./transaction-item";
import HeadLine from "../ui/HeadLine";
import { createClient } from "@/utils/server";
import { Transaction } from "@/types/database";
import Link from "next/link";

interface RecentTransactionsProps {
  initialData: Transaction[] | undefined; 
}
export default async function RecentTransactions({ initialData }: RecentTransactionsProps) {
  const supabase = await createClient();
  const transactions = initialData;
  
  return (
    <div>
      <HeadLine title="Recent Transactions"/>
      <div className="bg-surface-cards border border-border rounded-[5px] p-6 h-full shadow-[0_0_20px_rgba(119,0,255,0.15)] mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-primary h3">Recent Expenses</h3>
          <Link href='/expenses'>
          <button className="small text-blue hover:text-hover hover:underline">View all →</button>
          </Link>
        </div>

        <div className="flex flex-col">
          {transactions?.map((t) => (
            <TransactionItem 
              key={t.id} 
              name={t.title} 
              date={new Date(t.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
              category={t.category.charAt(0).toUpperCase() + t.category.slice(1)}
              amount={t.amount}
              type={t.category.toLowerCase()}
            />
          ))}
          
          {(!transactions || transactions.length === 0) && (
            <p className="text-secondary text-sm italic py-4 text-center">
              No transactions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}