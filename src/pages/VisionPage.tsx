
import { useState, useEffect } from "react";
import { LifeAreaCard } from "@/components/vision/LifeAreaCard";
import { LifeArea, Milestone } from "@/types/vision";
import { v4 as uuidv4 } from "uuid";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Initialize with default life areas
const initializeLifeAreas = (): LifeArea[] => {
  const savedAreas = localStorage.getItem("lifeAreas");
  
  if (savedAreas) {
    return JSON.parse(savedAreas);
  }
  
  // Default life areas
  const defaultAreas: LifeArea[] = [
    {
      id: uuidv4(),
      name: "Health",
      description: "Physical, mental, and emotional well-being",
      vision: "",
      milestones: Array.from({ length: 10 }, (_, i) => ({
        year: i + 1,
        text: "",
        completed: false,
      })),
      iconColor: "green",
    },
    {
      id: uuidv4(),
      name: "Career",
      description: "Professional growth and fulfillment",
      vision: "",
      milestones: Array.from({ length: 10 }, (_, i) => ({
        year: i + 1,
        text: "",
        completed: false,
      })),
      iconColor: "blue",
    },
    {
      id: uuidv4(),
      name: "Finances",
      description: "Financial security and freedom",
      vision: "",
      milestones: Array.from({ length: 10 }, (_, i) => ({
        year: i + 1,
        text: "",
        completed: false,
      })),
      iconColor: "amber",
    },
    {
      id: uuidv4(),
      name: "Relationships",
      description: "Meaningful connections with others",
      vision: "",
      milestones: Array.from({ length: 10 }, (_, i) => ({
        year: i + 1,
        text: "",
        completed: false,
      })),
      iconColor: "pink",
    },
    {
      id: uuidv4(),
      name: "Spirituality",
      description: "Connection to something larger than yourself",
      vision: "",
      milestones: Array.from({ length: 10 }, (_, i) => ({
        year: i + 1,
        text: "",
        completed: false,
      })),
      iconColor: "purple",
    },
    {
      id: uuidv4(),
      name: "Growth",
      description: "Personal development and learning",
      vision: "",
      milestones: Array.from({ length: 10 }, (_, i) => ({
        year: i + 1,
        text: "",
        completed: false,
      })),
      iconColor: "cyan",
    },
    {
      id: uuidv4(),
      name: "Leisure",
      description: "Recreation, hobbies, and enjoyment",
      vision: "",
      milestones: Array.from({ length: 10 }, (_, i) => ({
        year: i + 1,
        text: "",
        completed: false,
      })),
      iconColor: "orange",
    },
  ];
  
  return defaultAreas;
};

const VisionPage = () => {
  const [lifeAreas, setLifeAreas] = useState<LifeArea[]>(() => 
    initializeLifeAreas()
  );

  // Save life areas to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("lifeAreas", JSON.stringify(lifeAreas));
  }, [lifeAreas]);

  // Update a specific life area
  const updateLifeArea = (id: string, data: { vision: string; milestones: Milestone[] }) => {
    setLifeAreas(
      lifeAreas.map((area) =>
        area.id === id ? { ...area, ...data } : area
      )
    );
    toast.success("Vision updated successfully");
  };

  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalMilestones = lifeAreas.reduce(
      (acc, area) => acc + area.milestones.length,
      0
    );
    
    const completedMilestones = lifeAreas.reduce(
      (acc, area) =>
        acc + area.milestones.filter((m) => m.completed).length,
      0
    );
    
    return totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">10-Year Vision Plan</h1>
        <p className="text-muted-foreground">
          Envision your ideal future across key life areas
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress
              value={calculateOverallProgress()}
              className="h-2 flex-1"
            />
            <span className="text-sm font-medium">
              {calculateOverallProgress()}%
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {lifeAreas.map((area) => (
          <LifeAreaCard
            key={area.id}
            areaName={area.name}
            description={area.description}
            vision={area.vision}
            milestones={area.milestones}
            iconColor={area.iconColor}
            onUpdate={(data) => updateLifeArea(area.id, data)}
          />
        ))}
      </div>
    </div>
  );
};

export default VisionPage;
