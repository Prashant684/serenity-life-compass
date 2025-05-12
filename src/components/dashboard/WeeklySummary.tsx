
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function WeeklySummary() {
  // Mock data
  const weeklyData = {
    tasksCompleted: 12,
    totalTasks: 18,
    journalEntries: 4,
    reflectionTime: 35, // in minutes
    topMood: "Good",
  };

  const completionRate = Math.round((weeklyData.tasksCompleted / weeklyData.totalTasks) * 100);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Weekly Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Task Completion</span>
              <span className="text-sm font-medium">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-md p-3">
              <div className="text-2xl font-semibold">{weeklyData.tasksCompleted}</div>
              <div className="text-xs text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="bg-secondary/50 rounded-md p-3">
              <div className="text-2xl font-semibold">{weeklyData.journalEntries}</div>
              <div className="text-xs text-muted-foreground">Journal Entries</div>
            </div>
          </div>
          
          <div className="text-sm">
            <div className="flex justify-between py-1 border-b">
              <span>Reflection Time</span>
              <span>{weeklyData.reflectionTime} min</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span>Top Mood</span>
              <span>{weeklyData.topMood}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Streak</span>
              <span>6 days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
