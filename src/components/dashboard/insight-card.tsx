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
    },
    success: {
      border: " border-success",
      bg: "bg-background",
    },
    tip: {
      border: " border-hover",
      bg: "bg-background",
    },
  };

  const current = styles[type];

  return (
    <div className={cn(
      "p-4 rounded-xl border-l-2 flex gap-4 transition-all hover:scale-[1.02] hover:bg-white/5 ",
      current.border,
      current.bg
    )}>
      <p className="body/7 text-secondary leading-relaxed">{text}</p>
    </div>
  );
};