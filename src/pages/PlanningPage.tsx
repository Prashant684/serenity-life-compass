
import { useState, useEffect } from "react";
import { YearlyGoalsCard, YearlyGoal } from "@/components/planning/YearlyGoalsCard";
import { MonthlyPlanCard, MonthlyPlan } from "@/components/planning/MonthlyPlanCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface YearlyPlanner {
  year: number;
  goals: YearlyGoal[];
}

interface MonthlyPlans {
  [month: string]: MonthlyPlan;
}

const PlanningPage = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  
  // State for yearly planners
  const [yearlyPlanners, setYearlyPlanners] = useState<YearlyPlanner[]>(() => {
    const savedPlanners = localStorage.getItem("yearlyPlanners");
    if (savedPlanners) {
      return JSON.parse(savedPlanners);
    }
    
    // Initialize with current year and next year
    return [
      { year: currentYear, goals: [] },
      { year: currentYear + 1, goals: [] },
    ];
  });
  
  // State for monthly plans
  const [monthlyPlans, setMonthlyPlans] = useState<MonthlyPlans>(() => {
    const savedPlans = localStorage.getItem("monthlyPlans");
    if (savedPlans) {
      return JSON.parse(savedPlans);
    }
    
    // Initialize all months with empty plans
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const initialPlans: MonthlyPlans = {};
    months.forEach(month => {
      initialPlans[month] = {
        goals: "",
        actions: "",
        reflections: ""
      };
    });
    
    return initialPlans;
  });
  
  // State for selected year
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  
  // Save planners and plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("yearlyPlanners", JSON.stringify(yearlyPlanners));
    localStorage.setItem("monthlyPlans", JSON.stringify(monthlyPlans));
  }, [yearlyPlanners, monthlyPlans]);
  
  // Update yearly goals
  const updateYearlyGoals = (year: number, goals: YearlyGoal[]) => {
    setYearlyPlanners(
      yearlyPlanners.map(planner =>
        planner.year === year ? { ...planner, goals } : planner
      )
    );
    toast.success(`${year} goals updated`);
  };
  
  // Update monthly plan
  const updateMonthlyPlan = (month: string, plan: MonthlyPlan) => {
    setMonthlyPlans({
      ...monthlyPlans,
      [month]: plan
    });
    toast.success(`${month} plan updated`);
  };
  
  // Get the selected year's planner
  const selectedYearPlanner = yearlyPlanners.find(
    planner => planner.year === selectedYear
  ) || { year: selectedYear, goals: [] };
  
  // All available years
  const availableYears = yearlyPlanners.map(planner => planner.year);
  
  // Months array for rendering
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Planning</h1>
          <p className="text-muted-foreground">
            Monthly and yearly planning to achieve your vision
          </p>
        </div>
        
        <Select
          value={selectedYear.toString()}
          onValueChange={value => setSelectedYear(parseInt(value))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-6">
        <YearlyGoalsCard
          year={selectedYear}
          goals={selectedYearPlanner.goals}
          onUpdate={goals => updateYearlyGoals(selectedYear, goals)}
        />
        
        <h2 className="text-xl font-semibold mt-8">Monthly Plans</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {months.map(month => (
            <MonthlyPlanCard
              key={month}
              month={month}
              plan={monthlyPlans[month]}
              onUpdate={plan => updateMonthlyPlan(month, plan)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanningPage;
