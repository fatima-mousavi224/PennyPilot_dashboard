/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { 
  CircleQuestionMark,
  Clapperboard,
  LucideIcon,
  NotebookPen,
  Pizza,
  TramFront,
} from "lucide-react";

const categoryConfig: Record<string, { color: string; icon: LucideIcon }> = {
  food: { color: "bg-[#2A0046] text-[#CB7DFE]", icon: Pizza },
  transport: { color: "bg-[#460000] text-[#FF8080]", icon: TramFront },
  entertainment: { color: "bg-[#422100] text-[#FFA206]", icon: Clapperboard },
  other: { color: "bg-[#001D3B] text-[#84DBE3]", icon: CircleQuestionMark },
  school: { color: "bg-[#002303] text-[#80E388]", icon: NotebookPen },
};

export const TransactionItem = ({
  name,
  date,
  category,
  amount,
  type,
}: any) => {

    const config = categoryConfig[type as keyof typeof categoryConfig] || categoryConfig.other;
  const Icon = config.icon;
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors px-2 rounded-lg ">
      <div className="flex items-center gap-4">
       <div className={cn("h-10 w-10 rounded-[5px] flex items-center justify-center", config.color)}>
          <Icon className="h-5 w-5" /> 
        </div>
        <div>
          <p className="text-primary h3">{name}</p>
          <p className="text-secondary small pt-1.5">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span
          className={cn(
            "px-3 py-1.5 rounded-full small tracking-wider",
            categoryConfig[type as keyof typeof categoryConfig].color, 
          )}
        >
          {category}
        </span>
        <p className="text-error body">
          -RM {amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
