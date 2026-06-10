/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, ChevronDown } from "lucide-react";

interface Props {
  categories: string[];
  availableDates: string[];
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onDateChange: (val: string) => void;
  onOrderChange: (val: string) => void;
}

export const ExpenseFilters = ({
  categories,
  availableDates,
  onSearchChange,
  onCategoryChange,
  onDateChange,
  onOrderChange,
}: Props) => {
  return (
    <div className="w-full border-t-[1.5px] border-border pt-5">
      <div className="flex flex-wrap lg:flex-nowrap items-end gap-6">
        {/* Categories */}
        <div className="flex flex-col gap-4">
          <label className="text-blue body uppercase ml-1">
            Categories
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className="px-3 py-2 rounded-full small text-secondary hover:bg-blue hover:text-white transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div className="w-full md:w-auto md:min-w-42.5">
          <FilterGroup label="Date" onChange={onDateChange}>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </FilterGroup>
        </div>

        {/* Order */}
        <div className="w-full md:w-auto md:min-w-42.5">
          <FilterGroup label="Order" onChange={onOrderChange}>
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
            <option value="Highest Amount">Highest Amount</option>
          </FilterGroup>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-62.5">
          <label className="text-blue body uppercase ml-1 mt-4">
            Search
          </label>

          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search Expenses..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-border border border-secondary rounded-full px-5 py-2 text-sm text-[#B3B3B3] outline-none focus:border-blue"
            />

            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterGroup = ({
  label,
  children,
  onChange,
}: {
  label: string;
  children: React.ReactNode;
  onChange: (value: string) => void;
}) => (
  <div className="flex flex-col gap-4 w-full">
    <label className="text-blue body uppercase ml-1">
      {label}
    </label>

    <div className="relative w-full">
      <select
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-border border border-secondary rounded-full px-5 py-2 text-sm text-[#B3B3B3] appearance-none outline-none focus:border-blue cursor-pointer"
      >
        {children}
      </select>

      <ChevronDown
        size={16}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3] pointer-events-none"
      />
    </div>
  </div>
);