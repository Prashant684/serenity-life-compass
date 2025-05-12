
import { useState, useEffect } from "react";
import { TaskForm, Task } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { v4 as uuidv4 } from "uuid";
import { CalendarIcon, ListIcon, Plus } from "lucide-react";
import { toast } from "sonner";

// Default projects
const DEFAULT_PROJECTS = [
  "Health", 
  "Career", 
  "Finance", 
  "Relationships", 
  "Personal Growth"
];

const TasksPage = () => {
  // State for tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks 
      ? JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
        }))
      : [];
  });

  // State for projects
  const [projects, setProjects] = useState<string[]>(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : DEFAULT_PROJECTS;
  });

  // State for filters
  const [selectedProject, setSelectedProject] = useState<string | "all">("all");
  const [selectedPriority, setSelectedPriority] = useState<string | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "completed" | "active">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for editing
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Save tasks and projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [tasks, projects]);
  
  // Handle saving a new task or updating an existing one
  const handleSaveTask = (taskData: Omit<Task, "id" | "completed">) => {
    if (editingTask) {
      // Update existing task
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, ...taskData }
          : task
      );
      setTasks(updatedTasks);
      toast.success("Task updated successfully");
    } else {
      // Add new task
      const newTask: Task = {
        id: uuidv4(),
        ...taskData,
        completed: false,
      };
      setTasks([newTask, ...tasks]);
      toast.success("Task created successfully");
    }
    
    // Add new project if it doesn't exist yet
    if (taskData.project && !projects.includes(taskData.project)) {
      setProjects([...projects, taskData.project]);
    }
    
    setEditingTask(null);
    setIsFormVisible(false);
  };
  
  // Toggle task completion status
  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  // Set up a task for editing
  const handleEditTask = (id: string) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setIsFormVisible(true);
    }
  };
  
  // Delete a task
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted");
  };
  
  // Filter tasks by search query
  const filteredBySearchTasks = searchQuery
    ? tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasks;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Task Manager</h1>
        <Button onClick={() => {
          setEditingTask(null);
          setIsFormVisible(!isFormVisible);
        }}>
          {isFormVisible ? "Close Form" : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </>
          )}
        </Button>
      </div>
      
      {isFormVisible && (
        <div className="mb-6">
          <TaskForm
            onSave={handleSaveTask}
            initialValues={editingTask || {}}
            projects={projects}
          />
        </div>
      )}
      
      <TaskFilters
        projects={projects}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">
            <ListIcon className="h-4 w-4 mr-2" />
            List View
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <TaskList
            tasks={filteredBySearchTasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            selectedProject={selectedProject}
            selectedPriority={selectedPriority}
            selectedStatus={selectedStatus}
          />
        </TabsContent>
        
        <TabsContent value="calendar">
          <div className="bg-muted/20 p-8 rounded-md text-center text-muted-foreground">
            Calendar view will be implemented in future updates.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TasksPage;
