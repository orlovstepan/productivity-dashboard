import { Goal as GoalType } from '../../types';
import styles from './Goal.module.css';

interface GoalProps {
  goal: GoalType;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onDelete: (id: number) => void;
}

const Goal: React.FC<GoalProps> = ({ goal, onIncrement, onDecrement, onDelete }) => {
    console.log('GOAL IN GOAL', goal)
  return (
    <div className={styles.goal}>
      <h2>{goal.name}</h2>
      <p>
        {goal.currentCount} / {goal.targetCount}
      </p>
      <button onClick={() => onIncrement(goal.id)}>Increment</button>
      <button onClick={() => onDecrement(goal.id)}>Decrement</button>
    </div>
  );
};

export default Goal;
