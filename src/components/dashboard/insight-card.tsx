// import { Lightbulb, TrendingUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightProps {
  text: string;
  type: "warning" | "success" | "tip";
}

export const InsightCard = ({ text, type }: InsightProps) => {
  const styles = {
    warning: {
      border: "border-error",
      bg: "bg-background",
    //   icon: <AlertCircle className="h-4 w-4 text-red-500" />,
    },
    success: {
      border: " border-success",
      bg: "bg-background",
    //   icon: <TrendingUp className="h-4 w-4 text-[#80E388]" />,
    },
    tip: {
      border: " border-hover",
      bg: "bg-background",
    //   icon: <Lightbulb className="h-4 w-4 text-[#84DBE3]" />,
    },
  };

  const current = styles[type];

  return (
    <div className={cn(
      "p-4 rounded-xl border-l-2 flex gap-4 transition-all hover:scale-[1.02] hover:bg-white/5 ",
      current.border,
      current.bg
    )}>
      {/* <div className="mt-1">{current.icon}</div> */}
      <p className="body/7 text-secondary leading-relaxed">{text}</p>
    </div>
  );
};