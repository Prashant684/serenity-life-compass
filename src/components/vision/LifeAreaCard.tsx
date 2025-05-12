
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Milestone } from "@/types/vision";
import { cn } from "@/lib/utils";
import { Edit, Check, Target, PieChart } from "lucide-react";

interface LifeAreaCardProps {
  areaName: string;
  description: string;
  vision: string;
  milestones: Milestone[];
  iconColor: string;
  onUpdate: (data: {
    vision: string;
    milestones: Milestone[];
  }) => void;
}

export function LifeAreaCard({
  areaName,
  description,
  vision,
  milestones,
  iconColor,
  onUpdate,
}: LifeAreaCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVision, setEditedVision] = useState(vision);
  const [editedMilestones, setEditedMilestones] = useState(milestones);

  const completedMilestones = milestones.filter((m) => m.completed).length;
  const progress = milestones.length > 0
    ? Math.round((completedMilestones / milestones.length) * 100)
    : 0;

  const handleSave = () => {
    onUpdate({
      vision: editedVision,
      milestones: editedMilestones,
    });
    setIsEditing(false);
  };

  const toggleMilestoneCompletion = (year: number) => {
    const updatedMilestones = editedMilestones.map((m) =>
      m.year === year ? { ...m, completed: !m.completed } : m
    );
    setEditedMilestones(updatedMilestones);
  };

  const updateMilestoneText = (year: number, text: string) => {
    const updatedMilestones = editedMilestones.map((m) =>
      m.year === year ? { ...m, text } : m
    );
    setEditedMilestones(updatedMilestones);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div 
              className={cn(
                "h-7 w-7 rounded-full flex items-center justify-center mr-2",
                `text-${iconColor}-500 bg-${iconColor}-100 dark:bg-${iconColor}-950`
              )}
            >
              {areaName === "Health" ? (
                <PieChart className="h-4 w-4" />
              ) : (
                <Target className="h-4 w-4" />
              )}
            </div>
            <CardTitle className="text-lg">{areaName}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <Check className="h-4 w-4 mr-1" /> Save
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-1" /> Edit
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-1">Vision</h4>
          {isEditing ? (
            <Textarea
              value={editedVision}
              onChange={(e) => setEditedVision(e.target.value)}
              className="min-h-[80px] focus-ring resize-none"
              placeholder={`What does an ideal ${areaName.toLowerCase()} look like for you in 10 years?`}
            />
          ) : (
            <div className="bg-secondary/30 p-3 rounded-md text-sm">
              {vision || (
                <span className="text-muted-foreground italic">
                  No vision statement defined yet.
                </span>
              )}
            </div>
          )}
        </div>

        <div className="space-y-1 mb-3">
          <h4 className="text-sm font-medium flex items-center">
            Progress
            <Badge variant="outline" className="ml-2">
              {completedMilestones}/{milestones.length} milestones
            </Badge>
          </h4>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Milestones</h4>
          
          {editedMilestones.map((milestone) => (
            <div
              key={milestone.year}
              className="flex gap-2 items-start border-l-2 border-muted pl-3 hover:border-primary transition-colors"
            >
              <div className="min-w-[40px] text-xs font-medium">
                Year {milestone.year}
              </div>
              
              {isEditing ? (
                <div className="flex-1">
                  <Textarea
                    value={milestone.text}
                    onChange={(e) =>
                      updateMilestoneText(milestone.year, e.target.value)
                    }
                    className="text-xs min-h-[60px] focus-ring resize-none"
                    placeholder={`What do you want to accomplish in year ${milestone.year}?`}
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "flex-1 text-sm py-1",
                    milestone.completed && "text-muted-foreground line-through"
                  )}
                >
                  {milestone.text || (
                    <span className="italic text-muted-foreground text-xs">
                      No milestone set for year {milestone.year}
                    </span>
                  )}
                </div>
              )}
              
              {isEditing && (
                <Button
                  variant={milestone.completed ? "default" : "outline"}
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => toggleMilestoneCompletion(milestone.year)}
                >
                  <Check className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
