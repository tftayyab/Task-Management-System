import { TaskIcon, DotIcon } from '../components/svg';

import { useEffect, useState } from "react";

const AnimatedNumber = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const step = Math.ceil(end / 40); // Adjust speed here
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, 20); // Smaller = faster count

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
    console.log(tasks.map(t => t.status));
  const total = tasks.length || 1;

  const getCount = (key) => tasks.filter((t) => t.status === key).length;
  const getPercent = (count) => Math.round((count / total) * 100);

  return (
    <div className="w-[19.3125rem] h-[11.9375rem] flex-shrink-0 rounded-[0.875rem] bg-[#F5F8FF] shadow-md p-4 flex flex-col gap-y-3 ">
      {/* Header */}
      <div className="flex items-center gap-x-2">
        <TaskIcon className="w-[1.04269rem] h-[1.02906rem] flex-shrink-0" />
        <p className="text-[#FF6767] text-[0.9375rem] font-medium font-inter mb-1">Task Status</p>
      </div>

      {/* Status Sections */}
      <div className="flex justify-between gap-x-2">
        {statusConfig.map(({ label, key, color }) => {
          const count = getCount(key);
          const percent = getPercent(count);
          return (
            <div className="flex flex-col gap-y-2 items-center" key={key}>
              <div className="relative flex items-center justify-center w-[5.625rem] h-[5.625rem] right-3">
                    <CircleProgress percent={percent} color={color} />
                    <p className="absolute text-black text-[0.9375rem] font-inter font-medium w-[2.3125rem] h-[1.25rem] flex items-center justify-center">
                        <AnimatedNumber target={percent} />
                    </p>
               </div>
              <div className="flex items-center gap-1">
                <DotIcon className="w-[0.31731rem] h-[0.31731rem] flex-shrink-0" fill={color} />
                <p className="text-black text-[0.625rem] font-inter font-medium w-[5.25rem] h-[0.75rem]">{label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskStatusCard;
