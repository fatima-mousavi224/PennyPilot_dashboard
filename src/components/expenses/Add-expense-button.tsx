"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddExpenseForm } from "../dashboard/add-expense-form";

export const AddExpenseButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue hover:bg-hover text-primary px-4 py-1 rounded-[50px] flex items-center gap-2 transition-all font-medium text-sm">
          <Plus size={18} />
          Add Expense
        </button>
      </DialogTrigger>
      <DialogContent className="bg-surface-cards border-border text-white sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="h3 text-primary">Add New Expense</DialogTitle>
          <DialogDescription className="text-secondary text-xs">
            Fill in the details below to track a new expense.
          </DialogDescription>
        </DialogHeader>
        <AddExpenseForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
