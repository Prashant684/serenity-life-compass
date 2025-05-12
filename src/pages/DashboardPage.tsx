
import { TodayTasks } from "@/components/dashboard/TodayTasks";
import { DailyQuote } from "@/components/dashboard/DailyQuote";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { WeeklySummary } from "@/components/dashboard/WeeklySummary";

const DashboardPage = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Welcome to Your Compass</h1>
        <p className="text-muted-foreground">{today}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <TodayTasks />
          <WeeklySummary />
        </div>
        <div className="space-y-6">
          <DailyQuote />
          <MoodTracker />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
