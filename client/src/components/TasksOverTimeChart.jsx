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

const formatDateKey = (dateStr) => new Date(dateStr).toISOString().split('T')[0];
const formatLabel = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

const TasksOverTimeChart = ({ tasks }) => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const chartData = useMemo(() => {
    const createdMap = {}, completedMap = {}, inProgressMap = {};

    tasks.forEach((task) => {
      const key = formatDateKey(task.createdAt);
      createdMap[key] = (createdMap[key] || 0) + 1;

      const updatedKey = formatDateKey(task.updatedAt || task.createdAt);
      if (task.status === 'Completed') {
        completedMap[updatedKey] = (completedMap[updatedKey] || 0) + 1;
      }
      if (task.status === 'In Progress') {
        inProgressMap[updatedKey] = (inProgressMap[updatedKey] || 0) + 1;
      }
    });

    const allKeys = Array.from(new Set([
      ...Object.keys(createdMap),
      ...Object.keys(completedMap),
      ...Object.keys(inProgressMap),
    ])).sort((a, b) => new Date(a) - new Date(b));

    return {
      labels: allKeys.map(formatLabel),
      datasets: [
        {
          label: 'Created',
          data: allKeys.map(k => createdMap[k] || 0),
          borderColor: '#FF9F40',
          backgroundColor: 'rgba(255, 159, 64, 0.15)',
          pointBackgroundColor: '#FF9F40',
          pointRadius: 4,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'In Progress',
          data: allKeys.map(k => inProgressMap[k] || 0),
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.15)',
          pointBackgroundColor: '#36A2EB',
          pointRadius: 4,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Completed',
          data: allKeys.map(k => completedMap[k] || 0),
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.15)',
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
    interaction: { mode: 'index', intersect: false },
    plugins: {
      tooltip: {
        backgroundColor: isDark ? '#1e1e1e' : '#fff',
        titleColor: isDark ? '#fff' : '#333',
        bodyColor: isDark ? '#ccc' : '#555',
        borderColor: isDark ? '#444' : '#ccc',
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
          color: isDark ? '#f0f0f0' : '#333',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: { size: 14 },
          color: isDark ? '#ffffff' : '#333',
        },
        ticks: {
          color: isDark ? '#dddddd' : '#333',
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          lineWidth: 1,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
          color: isDark ? '#dddddd' : '#333',
          callback: (value) => Number.isInteger(value) ? value : null,
        },
        title: {
          display: true,
          text: 'Tasks',
          font: { size: 14 },
          color: isDark ? '#ffffff' : '#333',
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          lineWidth: 1,
        },
      },
    },
  };

  return (
    <div className="w-full rounded-2xl bg-[#F5F8FF] dark:bg-[#1a1a1a] shadow-lg p-4 h-full transition hover:shadow-xl">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TasksOverTimeChart;
