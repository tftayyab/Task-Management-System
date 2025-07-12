import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const formatDateKey = (dateStr) => {
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0]; // yyyy-mm-dd (sortable)
};

const formatLabel = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  }); // e.g. 12 Jul
};

const TasksOverTimeChart = ({ tasks }) => {
  const chartData = useMemo(() => {
    const createdMap = {};
    const completedMap = {};
    const inProgressMap = {};

    tasks.forEach((task) => {
      const createdKey = formatDateKey(task.createdAt);
      createdMap[createdKey] = (createdMap[createdKey] || 0) + 1;

      if (task.status === 'Completed') {
        const key = formatDateKey(task.updatedAt || task.createdAt);
        completedMap[key] = (completedMap[key] || 0) + 1;
      }

      if (task.status === 'In Progress') {
        const key = formatDateKey(task.updatedAt || task.createdAt);
        inProgressMap[key] = (inProgressMap[key] || 0) + 1;
      }
    });

    const allKeys = Array.from(
      new Set([
        ...Object.keys(createdMap),
        ...Object.keys(completedMap),
        ...Object.keys(inProgressMap),
      ])
    ).sort((a, b) => new Date(a) - new Date(b));

    const labels = allKeys.map(formatLabel);
    const createdCounts = allKeys.map((d) => createdMap[d] || 0);
    const completedCounts = allKeys.map((d) => completedMap[d] || 0);
    const inProgressCounts = allKeys.map((d) => inProgressMap[d] || 0);

    return {
      labels,
      datasets: [
        {
          label: 'Created',
          data: createdCounts,
          borderColor: '#FF9F40',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          pointBackgroundColor: '#FF9F40',
          pointRadius: 4,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'In Progress',
          data: inProgressCounts,
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          pointBackgroundColor: '#36A2EB',
          pointRadius: 4,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Completed',
          data: completedCounts,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          pointBackgroundColor: '#4CAF50',
          pointRadius: 4,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [tasks]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#555',
        borderColor: '#ccc',
        borderWidth: 1,
        cornerRadius: 6,
        padding: 10,
        titleFont: { weight: 'bold' },
        bodyFont: { size: 12 },
        boxPadding: 6,
      },
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 13, family: 'Inter' },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: { size: 14 },
        },
        grid: {
          color: '#f2f2f2',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
            stepSize: 1,
            precision: 0,
            callback: function (value) {
            return Number.isInteger(value) ? value : null;
            },
        },
        title: {
            display: true,
            text: 'Tasks',
            font: { size: 14 },
        },
        grid: {
            color: '#f2f2f2',
        },
        },
    },
  };

  return (
    <div className="w-full rounded-2xl bg-[#F5F8FF] shadow-lg p-4 h-full transition hover:shadow-xl">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TasksOverTimeChart;
