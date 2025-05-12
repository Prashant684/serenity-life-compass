
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MonthlyPlan {
  goals: string;
  actions: string;
  reflections: string;
}

interface MonthlyPlanCardProps {
  month: string;
  plan: MonthlyPlan;
  onUpdate: (plan: MonthlyPlan) => void;
}

export function MonthlyPlanCard({
  month,
  plan,
  onUpdate,
}: MonthlyPlanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(plan);
  
  const handleSave = () => {
    onUpdate(editedPlan);
    setIsEditing(false);
  };
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthIndex = months.findIndex(m => m === month);
  const nextMonth = months[(monthIndex + 1) % 12];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{month}</CardTitle>
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
      <CardContent>
        <Tabs defaultValue="goals">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="reflections">Reflections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="goals" className="space-y-2">
            <h4 className="text-sm font-medium">Monthly Goals</h4>
            {isEditing ? (
              <Textarea
                value={editedPlan.goals}
                onChange={(e) =>
                  setEditedPlan({
                    ...editedPlan,
                    goals: e.target.value,
                  })
                }
                placeholder={`What do you want to accomplish in ${month}?`}
                className="min-h-[150px] focus-ring resize-none"
              />
            ) : (
              <div className="bg-secondary/30 p-3 rounded-md text-sm whitespace-pre-wrap min-h-[100px]">
                {plan.goals || (
                  <span className="text-muted-foreground italic">
                    No goals set for {month} yet.
                  </span>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="actions" className="space-y-2">
            <h4 className="text-sm font-medium">Key Actions</h4>
            {isEditing ? (
              <Textarea
                value={editedPlan.actions}
                onChange={(e) =>
                  setEditedPlan({
                    ...editedPlan,
                    actions: e.target.value,
                  })
                }
                placeholder={`What specific actions will you take in ${month}?`}
                className="min-h-[150px] focus-ring resize-none"
              />
            ) : (
              <div className="bg-secondary/30 p-3 rounded-md text-sm whitespace-pre-wrap min-h-[100px]">
                {plan.actions || (
                  <span className="text-muted-foreground italic">
                    No actions defined for {month} yet.
                  </span>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reflections" className="space-y-2">
            <h4 className="text-sm font-medium">Month-End Reflections</h4>
            {isEditing ? (
              <Textarea
                value={editedPlan.reflections}
                onChange={(e) =>
                  setEditedPlan({
                    ...editedPlan,
                    reflections: e.target.value,
                  })
                }
                placeholder={`At the end of ${month}, reflect on what went well and what you learned.`}
                className="min-h-[150px] focus-ring resize-none"
              />
            ) : (
              <div className="bg-secondary/30 p-3 rounded-md text-sm whitespace-pre-wrap min-h-[100px]">
                {plan.reflections || (
                  <span className="text-muted-foreground italic">
                    No reflections for {month} yet.
                  </span>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-right">
          <Button variant="ghost" size="sm" className="text-xs">
            <ArrowRight className="h-3 w-3 mr-1" />
            {nextMonth}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
