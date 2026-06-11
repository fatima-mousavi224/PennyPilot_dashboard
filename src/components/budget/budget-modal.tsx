"use client";

import { useState } from "react";
import { createClient } from "@/utils/client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BudgetModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData?: { category: string; limit_amount: number };
}

export const BudgetModal = ({
  open,
  setOpen,
  initialData,
}: BudgetModalProps) => {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const rawCategory = (formData.get("category") as string) || initialData?.category;
    const limit = parseFloat(formData.get("limit") as string);

    if (!rawCategory) {
      alert("Error: Category is missing.");
      setLoading(false);
      return;
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      alert("Authentication error: Please log in again.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("budgets").upsert(
      {
        category: rawCategory.toLowerCase().trim(),
        limit_amount: limit,
        user_id: user.id,
      },
      {
        onConflict: "category",
      },
    );

    if (error) {
      alert("Error: " + error.message);
    } else {
      setOpen(false);
      window.location.reload();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-surface-cards border-border text-white sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="text-primary h3">
            {initialData
              ? `Edit ${initialData.category} Limit`
              : "Set New Budget"}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500 sr-only">
            Form wrapper tool to configuration adjust spending allocation parameters.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary">Category</label>
            <select
              name="category"
              defaultValue={initialData?.category || "food"}
              disabled={!!initialData}
              className="bg-[#0a0f1d] border border-gray-800 rounded-md p-2 text-white outline-none focus:border-blue disabled:opacity-60"
            >
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
              <option value="school">School</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary">Monthly Limit (RM)</label>
            <input
              name="limit"
              type="number"
              required
              defaultValue={initialData?.limit_amount}
              className="bg-[#0a0f1d] border border-gray-800 rounded-md p-2 text-white outline-none focus:border-blue"
              placeholder="0.00"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue text-white font-bold py-2 rounded-md hover:bg-blue/80 transition-all"
          >
            {loading ? "Saving..." : "Save Budget"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};