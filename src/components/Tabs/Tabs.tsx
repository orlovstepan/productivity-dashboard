import { GoalType } from '../../types';
import Tab from '../Tab/Tab';
import styles from './Tabs.module.css';

interface TabsProps {
  currentTab: GoalType;
  onChange: (type: GoalType) => void;
}

const Tabs: React.FC<TabsProps> = ({ currentTab, onChange }) => {
  return (
    <div className={styles.tabs}>
      <Tab type="Year" currentTab={currentTab} onChange={onChange} />
      <Tab type="Month" currentTab={currentTab} onChange={onChange} />
    </div>
  );
};

export default Tabs;
