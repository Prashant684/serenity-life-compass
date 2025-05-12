
export interface Milestone {
  year: number;
  text: string;
  completed: boolean;
}

export interface LifeArea {
  id: string;
  name: string;
  description: string;
  vision: string;
  milestones: Milestone[];
  iconColor: string;
}
