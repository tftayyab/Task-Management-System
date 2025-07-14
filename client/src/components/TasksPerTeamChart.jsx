import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const getTeamName = (teams, teamId) => {
  const team = teams.find((t) => t._id === teamId);
  return team ? team.teamName : 'Unknown';
};

const TasksPerTeamChart = ({ tasks, teams }) => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const chartData = useMemo(() => {
    const teamStatusMap = {};

    tasks.forEach((task) => {
      if (!Array.isArray(task.teamIds)) return;

      task.teamIds.forEach((teamId) => {
        if (!teamStatusMap[teamId]) {
          teamStatusMap[teamId] = {
            Pending: 0,
            'In Progress': 0,
            Completed: 0,
          };
        }
        if (task.status in teamStatusMap[teamId]) {
          teamStatusMap[teamId][task.status]++;
        }
      });
    });

    const teamIds = Object.keys(teamStatusMap);
    const labels = teamIds.map((id) => getTeamName(teams, id));

    const pendingData = teamIds.map((id) => teamStatusMap[id].Pending || 0);
    const inProgressData = teamIds.map((id) => teamStatusMap[id]['In Progress'] || 0);
    const completedData = teamIds.map((id) => teamStatusMap[id].Completed || 0);

    return {
      labels,
      datasets: [
        {
          label: 'Pending',
          data: pendingData,
          backgroundColor: '#FFB347',
          borderRadius: 6,
        },
        {
          label: 'In Progress',
          data: inProgressData,
          backgroundColor: '#3ABEFF',
          borderRadius: 6,
        },
        {
          label: 'Completed',
          data: completedData,
          backgroundColor: '#4CAF50',
          borderRadius: 6,
        },
      ],
    };
  }, [tasks, teams]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: 'Inter', size: 10 },
          boxWidth: 12,
          padding: 16,
          color: isDark ? '#fff' : '#000',
        },
      },
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
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Teams',
          font: { size: 10, family: 'Inter' },
          color: isDark ? '#fff' : '#000',
        },
        ticks: {
          font: { family: 'Inter' },
          color: isDark ? '#ccc' : '#000',
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          lineWidth: 1,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
          font: { family: 'Inter' },
          color: isDark ? '#ccc' : '#000',
        },
        title: {
          display: true,
          text: 'Tasks',
          font: { size: 10, family: 'Inter' },
          color: isDark ? '#fff' : '#000',
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          lineWidth: 1,
        },
      },
    },
  };

  return (
    <div className="w-full sm:w-[22rem] rounded-2xl bg-[#F5F8FF] dark:bg-[#1a1a1a] shadow-lg p-4 flex flex-col transition hover:shadow-xl hover:scale-[1.01]">
      <div className="w-full h-56 sm:h-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TasksPerTeamChart;
