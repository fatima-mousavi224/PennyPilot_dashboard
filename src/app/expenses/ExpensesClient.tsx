"use client";

import { useState, useMemo } from "react";
import { Transaction } from "@/types/database";
import { ExpenseFilters } from "@/components/expenses/Expense-filters";
import { ExpenseStats } from "@/components/expenses/Expense-stats";
import { ExpenseTable } from "@/components/expenses/Expense-table";
import { AddExpenseButton } from "@/components/expenses/Add-expense-button";
import { Pagination } from "@/components/expenses/pagination";

export default function ExpensesClient({ initialTransactions = [] }: { initialTransactions: Transaction[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [order, setOrder] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 7; //

  const filteredTransactions = useMemo(() => {
    let list = [...initialTransactions];

    if (search) {
      list = list.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (category !== "All") {
      list = list.filter(t => t.category.toLowerCase() === category.toLowerCase());
    }

    if (dateFilter !== "All") {
      list = list.filter(t => {
        const d = new Date(t.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
        return d === dateFilter;
      });
    }

    list.sort((a, b) => {
      if (order === "Latest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (order === "Oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (order === "Highest Amount") return b.amount - a.amount;
      return 0;
    });

    return list;
  }, [search, category, dateFilter, order, initialTransactions]);

  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const activePage = currentPage > totalPages ? 1 : currentPage;

  const paginatedTransactions = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTransactions.slice(start, end);
  }, [filteredTransactions, activePage]);

  const totalSpent = filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  
  const availableDates = useMemo(() => {
    const dates = initialTransactions.map(t => {
      const d = new Date(t.date);
      return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    });
    return ["All", ...Array.from(new Set(dates))];
  }, [initialTransactions]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-6 flex flex-col gap-8 pt-16">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-primary text-2xl font-bold">Expenses</h1>
          <p className="text-secondary text-sm pt-1">Manage and Track your Expenses</p>
        </div>
        <AddExpenseButton />
      </div>

      <ExpenseFilters 
        categories={["All", "Food", "Transport", "Study", "Entertainment", "Others"]}
        availableDates={availableDates}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onDateChange={setDateFilter}
        onOrderChange={setOrder}
      />
      
      <ExpenseStats 
        total={totalSpent} 
        count={totalItems}
        avg={totalItems > 0 ? (totalSpent / 30) : 0}
      />

      <div className="flex flex-col">
        <ExpenseTable transactions={paginatedTransactions} />
        
        <Pagination 
          current={activePage} 
          total={totalItems} 
          itemsPerPage={itemsPerPage} 
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
}