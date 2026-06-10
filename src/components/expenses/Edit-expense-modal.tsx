"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Transaction } from "@/types/database";
import { AddExpenseForm } from "../dashboard/add-expense-form";

export const EditExpenseModal = ({ transaction }: { transaction: Transaction }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 hover:bg-white/10 rounded-md border border-secondary text-secondary transition-all">
          <Pencil size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-surface-cards border-border text-primary sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="h3 text-primary">Edit Expense</DialogTitle>
          <DialogDescription className="text-secondary text-xs">
            Update the details for &quot;{transaction.title}&quot;
          </DialogDescription>
        </DialogHeader>
        <AddExpenseForm setOpen={setOpen} initialData={transaction} />
      </DialogContent>
    </Dialog>
  );
};