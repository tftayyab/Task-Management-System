import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStatusDoughnutChart = ({ tasks }) => {
  const data = useMemo(() => {
    const statusCount = {
      Pending: 0,
      'In Progress': 0,
      Completed: 0,
    };

    tasks.forEach((task) => {
      if (statusCount[task.status] !== undefined) {
        statusCount[task.status]++;
      }
    });

    return {
      labels: ['Pending', 'In Progress', 'Completed'],
      datasets: [
        {
          data: [
            statusCount['Pending'],
            statusCount['In Progress'],
            statusCount['Completed'],
          ],
          backgroundColor: ['#FFB347', '#3ABEFF', '#4CAF50'],
          borderWidth: 1,
        },
      ],
    };
  }, [tasks]);

  const options = {
    responsive: true,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            family: 'Inter',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const label = context.label || '';
            return `${label}: ${value} task${value === 1 ? '' : 's'}`;
          },
        },
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#555',
        borderColor: '#ddd',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
      },
    },
  };

  return (
    <div className="w-full sm:w-[22rem] h-full rounded-2xl items-center bg-white shadow-lg p-4 transition hover:shadow-xl">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TaskStatusDoughnutChart;
