import HeadLine from "../ui/HeadLine";
import { InsightCard } from "./insight-card";
import { RefreshCcw, Sparkles } from "lucide-react";

export const AICoach = () => {
  return (
    <div>
      <HeadLine title="AI Insights" />
      <div className="bg-surface-cards border border-border rounded-[5px] p-6 h-full mt-8 shadow-md shadow-[#7700FF38]">
        <div className="flex justify-between items-center mb-9">
          <div className="flex items-center gap-1">
            <Sparkles className="h-5 w-5 text-[#699BCD]" />
            <h3 className="h3 text-primary">AI Spending Coach</h3>
          </div>
          <p className="body text-primary py-1 px-3 rounded-full bg-blue hover:bg-hover">AI</p>
        </div>

        <div className="flex flex-col gap-4">
          <InsightCard
            type="warning"
            text="You spent 40% more on food this week compared to your monthly average."
          />
          <InsightCard
            type="success"
            text="At this rate, you may exceed your budget before May 31st."
          />
          <InsightCard
            type="tip"
            text="Your transport spending is within a healthy range this month."
          />
        </div>

        <div className="flex items-center gap-2 mt-6 py-2 px-4 rounded-3xl hover:bg-white/5 border border-secondary w-max">
          <p className="text-primary body">Regenerate Insights</p> 
          <span><RefreshCcw size={18} className="text-primary"/></span>
        </div>
      </div>
    </div>
  );
};
