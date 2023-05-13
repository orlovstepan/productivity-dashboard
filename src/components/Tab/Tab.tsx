import { GoalType } from '../../types';
import styles from './Tab.module.css';

interface TabProps {
  type: GoalType;
  currentTab: GoalType;
  onChange: (type: GoalType) => void;
}

const Tab: React.FC<TabProps> = ({ type, currentTab, onChange }) => {
  return (
    <button
      className={type === currentTab ? styles.selected : ''}
      onClick={() => onChange(type)}
    >
      {type}
    </button>
  );
};

export default Tab;
