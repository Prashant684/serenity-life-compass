
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function MoodTracker() {
  const [moodValue, setMoodValue] = useState<number[]>([3]);
  const [savedToday, setSavedToday] = useState(false);
  
  const moodLabels = [
    "Very Low", "Low", "Neutral", "Good", "Excellent"
  ];

  const getMoodLabel = () => {
    return moodLabels[moodValue[0] - 1];
  };

  const getMoodColor = () => {
    switch (moodValue[0]) {
      case 1: return "text-red-500";
      case 2: return "text-orange-500";
      case 3: return "text-yellow-500";
      case 4: return "text-lime-500";
      case 5: return "text-green-500";
      default: return "";
    }
  };

  const saveMood = () => {
    // In a real app, this would save to a database
    toast.success("Mood saved for today");
    setSavedToday(true);
    
    // For demo purposes, we reset after 5 seconds
    setTimeout(() => {
      setSavedToday(false);
    }, 5000);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Today's Mood</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="text-center mb-4">
            <span className={`text-3xl ${getMoodColor()}`}>
              {getMoodLabel()}
            </span>
          </div>
          <Slider
            value={moodValue}
            min={1}
            max={5}
            step={1}
            onValueChange={setMoodValue}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
        <Button 
          onClick={saveMood} 
          className="w-full" 
          disabled={savedToday}
        >
          {savedToday ? "Saved" : "Save Mood"}
        </Button>
      </CardContent>
    </Card>
  );
}
