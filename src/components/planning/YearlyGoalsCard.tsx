
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Check, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

export interface YearlyGoal {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

interface YearlyGoalsCardProps {
  year: number;
  goals: YearlyGoal[];
  onUpdate: (goals: YearlyGoal[]) => void;
}

export function YearlyGoalsCard({ year, goals, onUpdate }: YearlyGoalsCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoalText, setNewGoalText] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState("");
  const [editedGoals, setEditedGoals] = useState(goals);

  const handleSave = () => {
    onUpdate(editedGoals);
    setIsEditing(false);
  };

  const addGoal = () => {
    if (!newGoalText.trim()) return;
    
    const newGoal = {
      id: Math.random().toString(36).substring(2, 9),
      text: newGoalText,
      completed: false,
      category: newGoalCategory || "General",
    };
    
    setEditedGoals([...editedGoals, newGoal]);
    setNewGoalText("");
    setNewGoalCategory("");
  };

  const toggleGoalCompletion = (id: string) => {
    setEditedGoals(
      editedGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const removeGoal = (id: string) => {
    setEditedGoals(editedGoals.filter((goal) => goal.id !== id));
  };

  const updateGoalText = (id: string, text: string) => {
    setEditedGoals(
      editedGoals.map((goal) =>
        goal.id === id ? { ...goal, text } : goal
      )
    );
  };

  const updateGoalCategory = (id: string, category: string) => {
    setEditedGoals(
      editedGoals.map((goal) =>
        goal.id === id ? { ...goal, category } : goal
      )
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{year} Goals</CardTitle>
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
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing && (
          <div className="space-y-2 border-b pb-4 mb-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Input
                  value={newGoalText}
                  onChange={(e) => setNewGoalText(e.target.value)}
                  placeholder="Add a new goal..."
                  className="focus-ring"
                />
              </div>
              <Input
                value={newGoalCategory}
                onChange={(e) => setNewGoalCategory(e.target.value)}
                placeholder="Category"
                className="focus-ring"
              />
            </div>
            <Button
              onClick={addGoal}
              disabled={!newGoalText.trim()}
              className="w-full"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Goal
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {editedGoals.length > 0 ? (
            editedGoals.map((goal) => (
              <div
                key={goal.id}
                className={cn(
                  "flex items-start space-x-2 p-2 rounded-md",
                  goal.completed ? "bg-secondary/50" : ""
                )}
              >
                <Checkbox
                  checked={goal.completed}
                  onCheckedChange={() => toggleGoalCompletion(goal.id)}
                  className="mt-1"
                />
                
                <div className="flex-1 space-y-1">
                  {isEditing ? (
                    <>
                      <Textarea
                        value={goal.text}
                        onChange={(e) => updateGoalText(goal.id, e.target.value)}
                        className="text-sm min-h-[60px] focus-ring resize-none"
                      />
                      <Input
                        value={goal.category}
                        onChange={(e) => updateGoalCategory(goal.id, e.target.value)}
                        placeholder="Category"
                        className="text-xs focus-ring"
                      />
                    </>
                  ) : (
                    <>
                      <p className={cn("text-sm", goal.completed && "line-through text-muted-foreground")}>
                        {goal.text}
                      </p>
                      <span className="inline-block text-xs bg-secondary px-2 py-0.5 rounded-full">
                        {goal.category}
                      </span>
                    </>
                  )}
                </div>
                
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeGoal(goal.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              <p>No goals set for {year} yet.</p>
              {isEditing && (
                <p className="text-xs mt-2">
                  Add your first goal using the form above.
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
