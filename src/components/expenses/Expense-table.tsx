"use client";

import { Transaction } from "@/types/database";
import {
  Trash2,
  Utensils,
  TramFront,
  Pizza,
  Wallet,
  NotebookPen,
  Clapperboard,
  CircleQuestionMark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { EditExpenseModal } from "./Edit-expense-modal";
import { createClient } from "@/utils/client";

export const ExpenseTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const supabase = createClient();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this expense?")) return;

    const { error } = await supabase.from("transactions").delete().eq("id", id);

    if (!error) router.refresh();
  };

  const getStyle = (cat: string) => {
    const c = cat.toLowerCase();

    if (c === "food")
      return {
        icon: <Pizza size={16} />,
        bg: "bg-[#2A0046]",
        text: "text-[#CB7DFE]",
        
      };

    if (c === "transport")
      return {
        icon: <TramFront size={16} />,
        bg: "bg-[#460000]",
        text: "text-[#FF8080]",
      };

    if (c === "school")
      return {
        icon: <NotebookPen size={16} />,
        bg: "bg-[#002303]",
        text: "text-[#80E388]",
      };
    if (c === "entertainment")
      return {
        icon: <Clapperboard size={16} />,
        bg: "bg-[#422100]",
        text: "text-[#FFA206]",
      };
    if (c === "other")
      return {
        icon: <CircleQuestionMark size={16} />,
        bg: "bg-[#001D3B]",
        text: "text-[#84DBE3]",
      };
  };

  if (transactions.length === 0) {
    return (
      <div className="flex min-h-105 flex-col items-center justify-center rounded-[5px] border border-border bg-surface-cards px-6 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue/10">
          <Wallet className="h-12 w-12 text-blue" />
        </div>

        <h2 className="text-2xl font-bold text-primary">No Expenses Yet</h2>

        <p className="mt-3 max-w-md text-secondary">
          Your expense tracker is empty. Start tracking your spending by adding
          your first expense.
        </p>

        <div className="mt-6 rounded-full border border-blue/20 bg-blue/10 px-5 py-2 text-sm font-medium text-blue">
          💰 Add your first expense to get started
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden rounded-[5px] border border-border bg-surface-cards">
      <table className="w-full text-left">
        <thead className="bg-[#1A2233] text-secondary text-xs uppercase">
          <tr>
            <th className="p-4 whitespace-nowrap">Date</th>
            <th className="p-4 whitespace-nowrap">Description</th>
            <th className="p-4 whitespace-nowrap">Category</th>
            <th className="p-4 whitespace-nowrap">Amount</th>
            <th className="p-4 text-center whitespace-nowrap">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border/50">
          {transactions.map((t, index) => {
            const s = getStyle(t.category) || {
              icon: <Utensils size={16} />,
              bg: "bg-[#001D3B]",
              text: "text-[#84DBE3]",
            };

            return (
              <tr
                key={t.id}
                className={cn(
                  "transition-colors hover:bg-white/5 shadow-sm shadow-[#7700FF38]",
                  index % 2 === 0
                    ? "bg-surface-cards border-y border-background"
                    : "bg-border border-y border-background"
                )}
              >
                <td className="p-4 text-sm text-secondary whitespace-nowrap">{t.date}</td>

                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={cn("rounded-[5px] p-2", s.bg, s.text)}>
                      {s.icon}
                    </div>
                    <span className="font-medium text-primary">{t.title}</span>
                  </div>
                </td>

                <td className="p-4 whitespace-nowrap">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-[50px] px-3 py-1 small2 uppercase",
                      s.bg,
                      s.text
                    )}
                  >
                    {t.category}
                  </span>
                </td>

                <td className="p-4 font-semibold text-error whitespace-nowrap">
                  -RM {t.amount.toFixed(2)}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <EditExpenseModal transaction={t} />
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="rounded border border-secondary p-2 text-error hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};