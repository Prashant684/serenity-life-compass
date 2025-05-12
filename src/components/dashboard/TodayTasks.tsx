
import { useState } from "react";
import { Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// Mock task data
const initialTasks = [
  { id: 1, title: "Morning meditation", completed: false, priority: "medium", time: "7:00 AM" },
  { id: 2, title: "Team meeting", completed: false, priority: "high", time: "10:00 AM" },
  { id: 3, title: "Draft proposal", completed: false, priority: "high", time: "1:00 PM" },
  { id: 4, title: "Evening exercise", completed: false, priority: "medium", time: "6:00 PM" },
];

export function TodayTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Today's Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-start space-x-3 p-2 rounded-md transition-colors",
                task.completed ? "bg-secondary/50 text-muted-foreground" : "hover:bg-secondary/50"
              )}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleComplete(task.id)}
              />
              <div className="flex flex-col flex-1">
                <span className={cn("font-medium", task.completed && "line-through")}>
                  {task.title}
                </span>
                <div className="flex items-center mt-1 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="text-muted-foreground">{task.time}</span>
                  <span 
                    className={cn(
                      "ml-2 px-2 py-0.5 rounded-full text-xs",
                      getPriorityColor(task.priority)
                    )}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {tasks.every(task => task.completed) && (
            <div className="text-center p-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 mx-auto mb-1" />
              <p>All tasks completed for today!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
