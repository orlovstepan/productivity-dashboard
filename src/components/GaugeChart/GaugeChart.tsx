import GaugeChart from 'react-gauge-chart';
import { Goal } from '../../types';

interface GaugeChartProps {
  goal: Goal;
}

const Gauge: React.FC<GaugeChartProps> = ({ goal }) => {
  const percentOfGoal = goal.currentCount / goal.targetCount;

  return (
    <div>
      <h2>{goal.name}</h2>
      <GaugeChart
        id={`gauge-chart-${goal.id}`}
        colors={["#ec5e5e", "#a6f8a6"]}
        percent={percentOfGoal}
        textColor="#000000"
      />
    </div>
  );
};

export default Gauge;
