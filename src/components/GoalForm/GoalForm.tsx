import { useState } from 'react';
import { GoalType } from '../../types';
import styles from './GoalForm.module.css';

interface GoalFormProps {
  onSubmit: (data: { name: string; targetCount: number; type: GoalType }) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [targetCount, setTargetCount] = useState('');
  const [type, setType] = useState<GoalType>('Year');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name,
      targetCount: Number(targetCount),
      type,
    });
    
    setName('');
    setTargetCount('');
    setType('Year');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Goal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Target Count"
        value={targetCount}
        onChange={(e) => setTargetCount(e.target.value)}
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as GoalType)}
        required
      >
        <option value="Year">Year</option>
        <option value="Month">Month</option>
      </select>
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default GoalForm;
