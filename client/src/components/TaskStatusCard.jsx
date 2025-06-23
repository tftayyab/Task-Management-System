import { TaskIcon, DotIcon } from '../components/svg';
import { useEffect, useState } from "react";

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

const statusConfig = [
  { label: "Pending", key: "Pending", color: "#FFB347" },
  { label: "In Progress", key: "In Progress", color: "#3ABEFF" },
  { label: "Completed", key: "Completed", color: "#4CAF50" },
];

const CircleProgress = ({ percent, color }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width="90" height="90" viewBox="0 0 90 90" className="transform -rotate-90">
      <circle
        cx="45"
        cy="45"
        r={normalizedRadius}
        stroke="#D9D9D9"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx="45"
        cy="45"
        r={normalizedRadius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
};

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
              <div className="relative flex items-center justify-center w-20 h-20">
                <CircleProgress percent={percent} color={color} />
                <p className="absolute text-black text-sm font-inter font-semibold">
                  <AnimatedNumber target={percent} />
                </p>
              </div>

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
