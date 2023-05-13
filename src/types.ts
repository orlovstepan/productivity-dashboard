export type GoalType = 'Year' | 'Month';

export interface Goal {
  id: number;
  name: string;
  targetCount: number;
  currentCount: number;
  type: GoalType;
}
