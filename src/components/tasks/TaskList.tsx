
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "./TaskForm";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  selectedProject: string | "all";
  selectedPriority: string | "all";
  selectedStatus: "all" | "completed" | "active";
}

export function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  selectedProject,
  selectedPriority,
  selectedStatus,
}: TaskListProps) {
  
  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter((task) => {
    const matchesProject =
      selectedProject === "all" || task.project === selectedProject;
    const matchesPriority =
      selectedPriority === "all" || task.priority === selectedPriority;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "completed" && task.completed) ||
      (selectedStatus === "active" && !task.completed);
    
    return matchesProject && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 border-red-500";
      case "medium":
        return "text-amber-500 border-amber-500";
      case "low":
        return "text-green-500 border-green-500";
      default:
        return "";
    }
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center p-8 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">No tasks match your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <Card
          key={task.id}
          className={cn(
            "transition-all",
            task.completed ? "bg-secondary/50" : ""
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleComplete(task.id)}
                className="mt-1"
              />

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={cn(
                        "font-medium",
                        task.completed && "line-through text-muted-foreground"
                      )}
                    >
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="outline">{task.project}</Badge>
                      
                      <Badge
                        variant="outline"
                        className={getPriorityColor(task.priority)}
                      >
                        {task.priority}
                      </Badge>
                      
                      {task.dueDate && (
                        <span className="text-xs text-muted-foreground">
                          Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
                        </span>
                      )}
                      
                      {task.recurring && (
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                          {task.recurringPattern}
                        </span>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(task.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => onDelete(task.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
