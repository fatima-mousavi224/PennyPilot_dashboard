/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Pizza, TramFront, NotebookPen, Clapperboard, CircleQuestionMark, Plus, PiggyBank, Pencil, TrendingUp, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { BudgetModal } from "@/components/budget/budget-modal";

export default function BudgetClient({ initialBudgets }: { initialBudgets: any[] }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<any>(null);

  const totalBudget = initialBudgets.reduce((acc, b) => acc + b.limit_amount, 0);
  const totalSpent = initialBudgets.reduce((acc, b) => acc + b.spent_amount, 0);
  const totalRemaining = totalBudget - totalSpent;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-6 flex flex-col gap-8 pt-16">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-primary text-2xl font-bold">Budget</h1>
          <p className="text-secondary md:text-sm text-[11px] pt-1">Set and manage your monthly spending limits</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue hover:bg-hover text-primary md:px-4 px-2 py-1 rounded-[50px] flex items-center gap-2 transition-all font-medium md:text-sm text-[12px]"
        >
          <Plus size={18} />
          Set Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t-[1.5px] border-border pt-8">
        <StatCard title="Total Budget" value={totalBudget} icon={<CircleDollarSign />} color="text-blue" />
        <StatCard title="Total Spent" value={totalSpent} icon={<TrendingUp />} color="text-error" />
        <StatCard title="Total Remaining" value={totalRemaining} icon={<PiggyBank />} color="text-success" />
      </div>

      {/* Budget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialBudgets.map((budget) => (
          <BudgetCard 
            key={budget.category} 
            budget={budget} 
            onEdit={() => setSelectedBudget(budget)} 
          />
        ))}
      </div>

      {/* Modals */}
      <BudgetModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      {selectedBudget && (
        <BudgetModal 
          open={!!selectedBudget} 
          setOpen={() => setSelectedBudget(null)} 
          initialData={selectedBudget} 
        />
      )}
    </main>
  );
}


function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-[#1A2233] border border-border p-6 rounded-[10px]">
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("p-2 rounded-md bg-white/5", color)}>{icon}</div>
        <span className="text-secondary text-xs font-bold uppercase tracking-widest">{title}</span>
      </div>
      <span className={cn("text-3xl font-bold", color === "text-blue" ? "text-primary" : color)}>
        RM {value.toLocaleString()}
      </span>
    </div>
  );
}

function BudgetCard({ budget, onEdit }: any) {
  const percentage = Math.min(Math.round((budget.spent_amount / budget.limit_amount) * 100), 100);
  
  const getStatus = (pct: number) => {
    if (pct >= 90) return { label: "Almost Exceeded", color: "text-error", bg: "bg-error/10", bar: "bg-error" };
    if (pct >= 75) return { label: "Near Limit", color: "text-warning", bg: "bg-warning/10", bar: "bg-warning" };
    return { label: "On Track", color: "text-success", bg: "bg-success/10", bar: "bg-success" };
  };

  const status = getStatus(percentage);
  const iconStyle = getCategoryStyle(budget.category);

  return (
    <div className="bg-[#1A2233] border border-border p-6 rounded-[15px] flex flex-col gap-5">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-xl", iconStyle.bg, iconStyle.text)}>{iconStyle.icon}</div>
          <div>
            <h3 className="text-primary font-bold text-xl capitalize">{budget.category}</h3>
            <p className="text-secondary text-xs">RM {budget.spent_amount} of RM {budget.limit_amount} spent</p>
          </div>
        </div>
        <span className={cn("text-2xl font-bold", status.color)}>{percentage}%</span>
      </div>

      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
        <div className={cn("h-full transition-all duration-700", status.bar)} style={{ width: `${percentage}%` }} />
      </div>

      <div className="flex justify-between items-center">
        <span className={cn("px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider", status.bg, status.color)}>
          {status.label}
        </span>
        <button 
          onClick={onEdit}
          className="flex items-center gap-2 text-secondary text-xs hover:text-primary transition-all border border-border px-4 py-2 rounded-full"
        >
          <Pencil size={14} /> Edit Limit
        </button>
      </div>
    </div>
  );
}

function getCategoryStyle(cat: string) {
  const c = cat.toLowerCase();
  if (c === 'food') return { icon: <Pizza />, bg: "bg-[#2A0046]", text: "text-[#CB7DFE]" };
  if (c === 'transport') return { icon: <TramFront />, bg: "bg-[#460000]", text: "text-[#FF8080]" };
  if (c === 'school') return { icon: <NotebookPen />, bg: "bg-[#002303]", text: "text-[#80E388]" };
  if (c === 'entertainment') return { icon: <Clapperboard />, bg: "bg-[#2A1A00]", text: "text-[#FFA206]" };
  return { icon: <CircleQuestionMark />, bg: "bg-[#001D3B]", text: "text-[#84DBE3]" };
}