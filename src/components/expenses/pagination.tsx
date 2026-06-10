"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  current: number;
  total: number;
  itemsPerPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ current, total, itemsPerPage, totalPages, onPageChange }: Props) => {
  const startItem = total === 0 ? 0 : (current - 1) * itemsPerPage + 1;
  const endItem = Math.min(current * itemsPerPage, total);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center py-4 px-2">
      <p className="text-secondary small italic">
        showing {endItem - startItem + 1} of {total} expenses
      </p>

      <div className="flex gap-2">
        <button 
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
          className="p-2 border border-secondary rounded-sm text-secondary hover:bg-white/5 disabled:opacity-30 transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 border rounded-sm text-xs font-medium transition-all ${
              current === p 
                ? "border-blue bg-blue/10 text-primary" 
                : "border-secondary text-secondary hover:border-blue/50"
            }`}
          >
            {p}
          </button>
        ))}

        <button 
          disabled={current === totalPages || total === 0}
          onClick={() => onPageChange(current + 1)}
          className="p-2 border border-secondary rounded-sm text-secondary hover:bg-white/5 disabled:opacity-30 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};