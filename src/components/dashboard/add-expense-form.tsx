"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/client";
import { Transaction } from "@/types/database";

interface AddExpenseFormProps {
  setOpen: (open: boolean) => void;
  initialData?: Transaction;
}

export const AddExpenseForm = ({ setOpen, initialData }: AddExpenseFormProps) => {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const isEditing = !!initialData;

  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
  const today = now.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const dateValue = formData.get("date") as string;
    const selectedDate = new Date(dateValue);

    if (selectedDate.getMonth() !== now.getMonth() || selectedDate.getFullYear() !== now.getFullYear()) {
        alert("Please only select a date within the current month!");
        setLoading(false);
        return;
    }

    const payload = {
      title: formData.get("title"),
      amount: parseFloat(formData.get("amount") as string),
      category: formData.get("category"),
      date: dateValue,
    };

    let error;
    if (isEditing) {
      const { error: updateError } = await supabase
        .from("transactions")
        .update(payload)
        .eq("id", initialData.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("transactions")
        .insert(payload);
      error = insertError;
    }

    if (!error) {
      setOpen(false);
      router.refresh();
    } else {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Description</label>
        <input name="title" required defaultValue={initialData?.title} className="bg-[#0a0f1d] border border-gray-800 rounded-md p-2 text-white" placeholder="e.g. Starbucks" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Amount (RM)</label>
          <input name="amount" type="number" step="0.01" required defaultValue={initialData?.amount} className="bg-[#0a0f1d] border border-gray-800 rounded-md p-2 text-white" placeholder="0.00" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Category</label>
          <select name="category" defaultValue={initialData?.category?.toLowerCase() || "food"} className="bg-[#0a0f1d] border border-gray-800 rounded-md p-2 text-white">
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="school">School</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Date (Current Month Only)</label>
        <input 
          name="date" 
          type="date" 
          required 
          min={firstDay} 
          max={lastDay}  
          defaultValue={initialData?.date || today} 
          className="bg-[#0a0f1d] border border-gray-800 rounded-md p-2 text-white accent-[#5eead4]" 
        />
      </div>

      <button type="submit" disabled={loading} className="mt-4 bg-[#5eead4] text-black font-bold py-2 rounded-md hover:bg-[#5eead4]/80 transition-all">
        {loading ? "Saving..." : isEditing ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};