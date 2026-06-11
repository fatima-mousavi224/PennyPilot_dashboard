"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Pizza,
  CircleQuestionMark,
  TrendingUp,
  NotebookPen,
  TramFront,
  Clapperboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightItem {
  type: "danger" | "warning" | "success" | "info";
  message: string;
  badge: string;
}

interface CoachClientProps {
  initialData?: {
    total_spent?: number;
    budget_status?: string;
    days_left?: number;
    insights?: InsightItem[];
    meta_month?: string;
    meta_top_category?: string;
    meta_remaining_amount?: number;
  } | null;
}

export default function CoachClient({ initialData }: CoachClientProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/coach", { method: "POST" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to generate insights. Check database connections.");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating insights");
    } finally {
      setLoading(false);
    }
  };

  const hasData = !!initialData;
  const insights = initialData?.insights || [];

  const days = initialData?.days_left || 1;
  const rawRemaining = initialData?.meta_remaining_amount || 0;
  const dailyAllowance = (rawRemaining / days).toFixed(0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-6 flex flex-col gap-8 pt-16">
      <div>
        <h1 className="text-primary h3 tracking-tight">AI Coach</h1>
        <p className="text-secondary body mt-3">
          Your personal AI-powered spending advisor
        </p>
      </div>


      <div className="bg-surface-cards border border-border rounded-[5px] shadow-[0_0_20px_rgba(119,0,255,0.15)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          {/* Column 1 */}
          <div className="px-8 md:py-7 py-4 border-r border-border flex flex-col justify-center">
            <span className="text-secondary text-sm md:mb-6 mb-3">
              {initialData?.meta_month
                ? initialData.meta_month.replace("Analyzing ", "")
                : "Current Month"}
            </span>

            <span className="text-primary text-3xl font-semibold">
              RM {initialData?.total_spent?.toLocaleString() || "0"}
            </span>

            <span className="text-secondary text-sm mt-1">Total spent</span>
          </div>

          {/* Column 2 */}
          <div className="px-8 md:py-7 py-4 border-r border-border flex flex-col justify-center">
            <span className="text-secondary text-sm md:mb-6 mb-3">Top Category</span>

            <span className="text-primary text-3xl font-semibold">
              {initialData?.meta_top_category || "None"}
            </span>

            <span className="text-secondary text-sm mt-1">520 this month</span>
          </div>

          {/* Column 3 */}
          <div className="px-8 md:py-7 py-4 border-r border-border flex flex-col justify-center">
            <span className="text-secondary text-sm md:mb-6 mb-3">Budget Status</span>

            <span className="text-warning text-3xl font-semibold">
              {initialData?.budget_status || "0% used"}
            </span>

            <span className="text-secondary text-sm mt-1">
              RM {Math.round(rawRemaining).toLocaleString()} Remaining
            </span>
          </div>

          {/* Column 4 */}
          <div className="px-8 md:py-7 py-4 border-r border-border flex flex-col justify-center">
            <span className="text-secondary text-sm md:mb-6 mb-3">Days left</span>

            <span className="text-primary text-3xl font-semibold">
              {days} days left
            </span>

            <span className="text-secondary text-sm mt-1">
              RM {dailyAllowance}/day available
            </span>
          </div>

          <div className="px-6 py-7 flex items-center justify-center min-w-45">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue hover:bg-hover disabled:bg-blue-800 text-white text-sm font-medium px-5 py-3 rounded-full flex items-center gap-2 whitespace-nowrap transition-all active:scale-95"
            >
              <Sparkles size={15} className={cn(loading && "animate-spin")} />
              {loading ? "Analyzing..." : "generate insight"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-surface-cards border border-border rounded-[5px] p-6 flex flex-col gap-5 shadow-[0_0_20px_rgba(119,0,255,0.15)]">
        <div className="flex justify-between items-center border-b border-gray-800/60 pb-3">
          <div className="flex items-center gap-2">
            
            <Sparkles className="text-blue" size={22} />
            <h3 className="text-primary h3">
              AI Spending Coach
            </h3>
          </div>
          <div className="bg-blue hover:bg-hover text-primary small w-10 h-10 rounded-full flex items-center justify-center">
            AI
          </div>
        </div>

        {!hasData ? (
          <div className="text-center py-16 text-gray-500 body tracking-wide">
            No insights compiled yet. Click the &quot;generate insight&quot;
            button above to kickstart your analysis!
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {insights.map((item, idx) => {
              const design = getInsightStyles(item.type, item.message);
              return (
                <div
                  key={idx}
                  className={cn(
                    "bg-background rounded-[5px] md:p-5 px-2 py-3 flex justify-between items-center gap-4 transition-all hover:bg-[#151b29]",
                    design.leftBorder,
                  )}
                >
                  <div className="flex items-center md:gap-4 gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-[5px] shrink-0 flex items-center justify-center",
                        design.iconBg,
                        design.textColor,
                      )}
                    >
                      {design.icon}
                    </div>
                    <p className="text-secondary md:text-[15px] font-normal text-[11px] leading-relaxed">
                      {item.message}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "md:px-4 px-2 py-1 rounded-[50px] md:text-[13px] font-normal text-[10px] tracking-wide shrink-0 capitalize",
                      design.textColor,
                      design.iconBg
                      
                    )}
                  >
                    {item.badge.toLowerCase()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <h3 className="text-white font-semibold text-sm tracking-wide">
          Quick Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-surface-cards border border-border p-5 rounded-[5px] shadow-[0_0_20px_rgba(119,0,255,0.15)] flex flex-col gap-3.5 hover:border-gray-700/40 transition-colors">
            <div className="bg-[#422100] text-[#dfa53c] p-2 rounded-lg w-fit">
              <Pizza size={22} />
            </div>
            <div>
              <h4 className="text-primary body">
                Cook at home more
              </h4>
              <p className="text-secondary text-[13px] font-normal mt-3">
                Try cooking at home 2-3 times a week. You could save up to RM
                150 on food this month.
              </p> 
            </div>
          </div>

          <div className="bg-surface-cards border border-border p-5 rounded-[5px] shadow-[0_0_20px_rgba(119,0,255,0.15)] flex flex-col gap-3.5 hover:border-gray-700/40 transition-colors">
            <div className="bg-[#2A0046] text-[#a855f7] p-2 rounded-lg w-fit">
              <TrendingUp size={22} />
            </div>
            <div>
              <h4 className="text-white body">
                Pause one subscription
              </h4>
              <p className="text-secondary text-[13px] font-normal mt-3">
                You have multiple active subscriptions. Pausing one this month
                could free up RM 17-40 instantly.
              </p>
            </div>
          </div>

          <div className="bg-surface-cards border border-border p-5 rounded-[5px] shadow-[0_0_20px_rgba(119,0,255,0.15)] flex flex-col gap-3.5 hover:border-gray-700/40 transition-colors">
            <div className="bg-[#002303] text-[#10b981] p-2 rounded-lg w-fit">
              <NotebookPen size={22} />
            </div>
            <div>
              <h4 className="text-primary body">
                Plan your weekly budget
              </h4>
              <p className="text-secondary text-[13px] font-normal mt-3">
                Every Sunday, review last week&apos;s spending and set a daily
                limit for the week ahead to stay on track.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function getInsightStyles(type: string, message: string) {
  const lowercaseMsg = message.toLowerCase();

  let chosenIcon = <CircleQuestionMark size={20} />;
  if (lowercaseMsg.includes("food")) {
    chosenIcon = <Pizza size={20} />;
  } else if (lowercaseMsg.includes("transport")) {
    chosenIcon = <TramFront size={20} />;
  } else if (
    lowercaseMsg.includes("entertainment")
) {
    chosenIcon = <Clapperboard size={20} />;
} else if(
    
    lowercaseMsg.includes("school")
  ) {
    chosenIcon = <NotebookPen size={20} />;
  }

  switch (type) {
    case "danger":
      return {
        leftBorder: "border-l-[3px] border-l-[#EF4444]",
        iconBg: "bg-[#460000]",
        textColor: "text-[#FF8080]",
        icon: chosenIcon,
      };
    case "warning":
      return {
        leftBorder: "border-l-[3px] border-l-[#F59E0B]",
        iconBg: "bg-[#422100]",
        textColor: "text-[#F59E0B]",
        icon: chosenIcon,
      };
    case "success":
      return {
        leftBorder: "border-l-[3px] border-l-[#22C55E]",
        iconBg: "bg-[#002303]",
        textColor: "text-[#80E388]",
        icon: chosenIcon,
      };
    default:
      return {
        leftBorder: "border-l-[3px] border-l-[#699BCD]",
        iconBg: "bg-[#001D3B]",
        textColor: "text-[#B9DCFF]",
        icon: chosenIcon,
      };
  }
}
