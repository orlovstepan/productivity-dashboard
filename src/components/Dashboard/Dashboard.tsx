import { useState, useEffect } from 'react';
import { Goal as GoalType, GoalType as GT } from '../../types';
import Goal from '../Goal/Goal';
import GoalForm from '../GoalForm/GoalForm';
import Tabs from '../Tabs/Tabs';
import GaugeChart from '../GaugeChart/GaugeChart';
import styles from './Dashboard.module.css';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [currentTab, setCurrentTab] = useState<GT>('Year');
  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchGoals = async () => {
      const res = await axios.get('http://localhost:5005/goals');
      setGoals(res.data);
    };
    fetchGoals();
  }, []);

  const handleAddGoal = async (data: {
    name: string;
    targetCount: number;
    type: GT;
  }) => {
    const res = await axios.post('http://localhost:5005/goals', {
      ...data,
      currentCount: 0,
    });
    setGoals((goals) => [
      ...goals,
      res.data,
    ]);
  };

  const handleIncrement = async (id: number) => {
    const goal = goals.find((goal) => goal.id === id);
    if (goal) {
      const updatedGoal = { ...goal, currentCount: goal.currentCount + 1 };
      await axios.put(`http://localhost:5005/goals/${id}`, updatedGoal);
      setGoals((goals) =>
        goals.map((goal) =>
          goal.id === id ? updatedGoal : goal
        )
      );
    }
  };

  const handleDecrement = async (id: number) => {
    const goal = goals.find((goal) => goal.id === id);
    if (goal && goal.currentCount > 0) {
      const updatedGoal = { ...goal, currentCount: goal.currentCount - 1 };
      await axios.put(`http://localhost:5005/goals/${id}`, updatedGoal);
      setGoals((goals) =>
        goals.map((goal) =>
          goal.id === id ? updatedGoal : goal
        )
      );
    }
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5005/goals/${id}`);
    setGoals((goals) => goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className={styles.dashboard}>
      {goals.length > 0 && <Tabs currentTab={currentTab} onChange={setCurrentTab} />}
      <button onClick={() => setOpenForm(true)}>Add tracker</button>
      {openForm && <GoalForm onSubmit={handleAddGoal} />}
      {goals
        .filter((goal) => goal.type === currentTab)
        .map((goal) => (
          <div key={goal.id}>
            <Goal
              goal={goal}
              onIncrement={() => handleIncrement(goal.id)}
              onDecrement={() => handleDecrement(goal.id)}
              onDelete={() => handleDelete(goal.id)}
            />
            <GaugeChart goal={goal} />
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
