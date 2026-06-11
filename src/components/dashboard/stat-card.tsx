import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  subtextType?: "neutral" | "danger" | "success";
  icon?: React.ReactNode;
}

export const StatCard = ({
  title,
  value,
  subtext,
  subtextType = "neutral",
  icon,
}: StatCardProps) => {
  return (
    <div className="bg-surface-cards border border-border rounded-[5px] p-6 flex flex-col gap-2 relative overflow-hidden shadow-[0_0_20px_rgba(119,0,255,0.15)]">

      <div className="flex items-center gap-2 body text-secondary">
        <div className="">{icon}</div>
        {title}
      </div>

      <div className="h1 text-primary tracking-tight py-1">{value}</div>

      <div
        className={cn(
          "body",
          subtextType === "danger" && "text-error",
          subtextType === "success" && "text-success",
          subtextType === "neutral" && "text-secondary",
        )}
      >
        {subtext}
      </div>
    </div>
  );
};
