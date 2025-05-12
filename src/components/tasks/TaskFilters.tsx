
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TaskFiltersProps {
  projects: string[];
  selectedProject: string | "all";
  onProjectChange: (value: string) => void;
  selectedPriority: string | "all";
  onPriorityChange: (value: string) => void;
  selectedStatus: "all" | "completed" | "active";
  onStatusChange: (value: "all" | "completed" | "active") => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function TaskFilters({
  projects,
  selectedProject,
  onProjectChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
}: TaskFiltersProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <div>
            <Select 
              value={selectedProject} 
              onValueChange={onProjectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select 
              value={selectedPriority} 
              onValueChange={onPriorityChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select 
              value={selectedStatus} 
              onValueChange={(value: "all" | "completed" | "active") => 
                onStatusChange(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
