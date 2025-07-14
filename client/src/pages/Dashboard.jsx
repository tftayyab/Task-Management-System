import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import TaskStatusCard from '../components/TaskStatusCard';
import api from '../api';
import useIsMobile from '../utils/useScreenSize';
import useAuthToken from '../utils/useAuthToken';
import { motion } from 'framer-motion';
import TasksOverTimeChart from '../components/TasksOverTimeChart';
import TasksPerTeamChart from '../components/TasksPerTeamChart';

function Dashboard() {
  const {
    searchTerm,
    setSearchTerm,
    isMenuOpen,
    setIsMenuOpen,
    setNotification,
  } = useOutletContext();

  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useAuthToken();

  useEffect(() => {
    document.title = 'Dashboard';
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const username = localStorage.getItem('username');

      // Fetch personal tasks
      const tasksRes = await api.get(`/tasks?username=${username}`);
      setTasks(tasksRes.data);

      // Fetch shared teams + tasks to get team info
      const sharedRes = await api.get(`/tasks/shared`);
      const fetchedTeams = sharedRes.data.teams || [];
      setTeams(fetchedTeams);
    } catch (err) {
      console.error('❌ Failed to fetch dashboard data:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen h-screen bg-white dark:bg-[#121212] flex flex-col overflow-hidden text-black dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="flex flex-row mt-[2rem] gap-x-20 sm:mt-[1rem]"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex-1 flex justify-center sm:justify-end sm:mr-5 px-4 pb-6">
          {!isMenuOpen && (
            <div className="relative z-0 border sm:h-[76vh] border-[rgba(161,163,171,0.63)] dark:border-gray-700 shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 sm:w-[150vh] w-[40vh] bg-white dark:bg-[#1e1e1e] transition-all duration-300">
              
              {/* Right side */}
              <div className="order-1 sm:order-2 w-full sm:w-[22rem] flex flex-col gap-6 mt-6 sm:mt-0">
                <div className="flex justify-center sm:justify-start">
                  <TaskStatusCard tasks={tasks} />
                </div>

                <div className="flex justify-center sm:justify-start h-[40vh] w-full">
                  <TasksPerTeamChart tasks={tasks} teams={teams} />
                </div>
              </div>

              {/* Left side */}
              <div className="flex justify-center sm:justify-start h-[40vh] sm:h-full w-full">
                <TasksOverTimeChart tasks={tasks} />
              </div>

            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
