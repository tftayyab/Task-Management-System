import { TaskIcon, DotIcon } from '../components/svg';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

// Animated Number Component
const AnimatedNumber = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const step = Math.ceil(end / 40);
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, 20);

    return () => clearInterval(interval);
  }, [target]);

  return <>{count}%</>;
};

// Chart Settings
const statusConfig = [
  { label: 'Pending', key: 'Pending', color: '#FFB347' },
  { label: 'In Progress', key: 'In Progress', color: '#3ABEFF' },
  { label: 'Completed', key: 'Completed', color: '#4CAF50' },
];

// Chart Component for One Circle
const CircleChart = ({ percent, color }) => {
  const data = {
    datasets: [
      {
        data: [percent, 100 - percent],
        backgroundColor: [color, '#D9D9D9'],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const options = {
    cutout: '72%',
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
    },
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  return (
    <div className="relative w-20 h-20">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-black font-inter">
        <AnimatedNumber target={percent} />
      </div>
    </div>
  );
};

// Final TaskStatusCard
const TaskStatusCard = ({ tasks }) => {
  const total = tasks.length || 1;

  const getCount = (key) => tasks.filter((t) => t.status === key).length;
  const getPercent = (count) => Math.round((count / total) * 100);

  return (
    <div className="w-full sm:w-[22rem] rounded-2xl bg-[#F5F8FF] shadow-lg p-4 flex flex-col gap-y-4 transition hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-x-2">
        <TaskIcon className="w-5 h-5 flex-shrink-0" />
        <p className="text-[#FF6767] text-base font-medium font-inter">Task Status</p>
      </div>

      {/* Status Section */}
      <div className="flex justify-between sm:gap-x-2 gap-x-1">
        {statusConfig.map(({ label, key, color }) => {
          const count = getCount(key);
          const percent = getPercent(count);

          return (
            <div
              key={key}
              className="flex flex-col items-center gap-y-2 group hover:scale-105 transition-all"
            >
              <CircleChart percent={percent} color={color} />

              <div className="flex items-center gap-1">
                <DotIcon className="w-2 h-2" fill={color} />
                <p className="text-black text-xs font-medium font-inter">{label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskStatusCard;
