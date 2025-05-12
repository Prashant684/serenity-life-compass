
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { CalendarIcon, Save } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  priority: "low" | "medium" | "high";
  dueDate: Date | null;
  completed: boolean;
  recurring: boolean;
  recurringPattern?: string;
}

interface TaskFormProps {
  onSave: (task: Omit<Task, "id" | "completed">) => void;
  initialValues?: Partial<Task>;
  projects: string[];
}

export function TaskForm({ onSave, initialValues = {}, projects }: TaskFormProps) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [project, setProject] = useState(initialValues.project || (projects[0] || ""));
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    initialValues.priority || "medium"
  );
  const [dueDate, setDueDate] = useState<Date | null>(
    initialValues.dueDate || null
  );
  const [recurring, setRecurring] = useState(initialValues.recurring || false);
  const [recurringPattern, setRecurringPattern] = useState(
    initialValues.recurringPattern || "daily"
  );

  // Update form when initialValues change
  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
      setProject(initialValues.project || (projects[0] || ""));
      setPriority(initialValues.priority || "medium");
      setDueDate(initialValues.dueDate || null);
      setRecurring(initialValues.recurring || false);
      setRecurringPattern(initialValues.recurringPattern || "daily");
    }
  }, [initialValues, projects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      title,
      description,
      project,
      priority,
      dueDate,
      recurring,
      recurringPattern: recurring ? recurringPattern : undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setProject(projects[0] || "");
    setPriority("medium");
    setDueDate(null);
    setRecurring(false);
    setRecurringPattern("daily");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>
          {initialValues.id ? "Edit Task" : "Create New Task"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
              className="focus-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              className="focus-ring resize-none h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="project" className="text-sm font-medium">
                Project
              </label>
              <Select
                value={project}
                onValueChange={setProject}
              >
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <Select
                value={priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setPriority(value)
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className="text-sm font-medium">
              Due Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate || undefined}
                  onSelect={(date) => setDueDate(date || null)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="recurring"
              checked={recurring}
              onCheckedChange={setRecurring}
            />
            <label htmlFor="recurring" className="text-sm font-medium">
              Recurring Task
            </label>
          </div>

          {recurring && (
            <div className="space-y-2">
              <label htmlFor="recurringPattern" className="text-sm font-medium">
                Repeat
              </label>
              <Select
                value={recurringPattern}
                onValueChange={setRecurringPattern}
              >
                <SelectTrigger id="recurringPattern">
                  <SelectValue placeholder="Select pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              Save Task
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
