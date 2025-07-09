import { useEffect, useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import Tasks from '../components/Tasks';
import api from '../api';
import Edit from './EditTasks';
import useAuthToken from '../utils/useAuthToken';
import ShareTasks from './ShareTasks';
import { motion } from 'framer-motion';
import TaskList from '../components/TaskList';
import useIsMobile from '../utils/useScreenSize'; // ✅

function ViewTeamTasks() {
  const {
    searchTerm,
    setSearchTerm,
    isMenuOpen,
    setIsMenuOpen,
    setNotification, // ✅ Notification function
  } = useOutletContext();

  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState(null);
  const [shareTask, setShareTask] = useState(null);
  const isMobile = useIsMobile();


  const navigate = useNavigate();
  useAuthToken();

  useEffect(() => {
    const tryFetch = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        try {
          const res = await api.get('/auth/refresh-token');
          const newToken = res.data.accessToken;
          localStorage.setItem('token', newToken);
        } catch (err) {
          window.location.href = '/login';
          return;
        }
      }

      fetchTasksWithRetry();
    };

    tryFetch();
  }, []);

const fetchTasksWithRetry = async () => {
  try {
    const res = await api.get(`/tasks/shared`);
    const allTasks = res.data.tasks; // ✅ Access the correct array
    const teamTasks = allTasks.filter(task => task.teamIds?.includes(id));
    setTasks(teamTasks);
    setFilteredTasksList(teamTasks);
  } catch (err) {
    console.error("❌ Fetch error:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (id && filteredTasksList.length > 0) {
      const exists = filteredTasksList.some(task => task._id === id);
      setSelectedTaskId(exists ? id : null);
    } else if (!selectedTaskId && filteredTasksList.length > 0) {
      setSelectedTaskId(filteredTasksList[0]._id);
    }
  }, [id, filteredTasksList, selectedTaskId]);

  return (
    <motion.div
      className="min-h-screen h-screen bg-white flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ✅ Row: Menu + Main Box */}
      <motion.div
        className="flex flex-row mt-[2rem] gap-x-20 sm:mt-[1rem]"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* ✅ Task Preview Box */}
        <div className="flex-1 flex justify-center sm:justify-end sm:mr-5 px-4 pb-6">
          {!isMenuOpen && (
            <div className="relative z-0 border sm:h-[76vh] border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 sm:w-[150vh] w-[40vh] bg-white transition-all duration-300">

              {/* 🔷 Right Side: Task Preview */}
              <div className="order-1 sm:order-2 w-full flex flex-col gap-6 sm:mt-0">
            {/* If on mobile, show TaskList instead of full preview */}
            {isMobile ? (
            <div className="h-full bg-[#F5F8FF] p-4 rounded-xl border overflow-y-auto scrollbar-hide">
                <TaskList
                tasks={tasks}
                statuses={["Pending", "In Progress", "Completed"]}
                fetchTasksWithRetry={fetchTasksWithRetry}
                onTaskClick={(taskId) => navigate(`/viewtask/${taskId}`)}
                setEditTask={setEditTask}
                setShareTask={setShareTask}
                searchTerm={searchTerm}
                loading={loading}
                />
            </div>
            ) : (
            selectedTaskId && (
                <div className="h-[31rem] bg-[#F5F8FF] p-4 rounded-xl sm:mt-0 -mt-5 border overflow-y-auto scrollbar-hide">
                <Tasks
                    tasks={tasks}
                    task_id={selectedTaskId}
                    setEditTask={setEditTask}
                    setShareTask={setShareTask}
                    fetchTasksWithRetry={fetchTasksWithRetry}
                    loading={loading}
                />
                </div>
            )
            )}
              </div>

            </div>
          )}
        </div>
      </motion.div>

      {/* ✅ Modal for Edit */}
      {editTask && (
        <Edit
          taskData={editTask}
          onClose={() => setEditTask(null)}
          fetchTasksWithRetry={() => {
            fetchTasksWithRetry();
            setNotification("Task updated successfully");
          }}
        />
      )}

      {shareTask && (
        <ShareTasks
          taskData={shareTask}
          onClose={() => setShareTask(null)}
          fetchTasksWithRetry={() => {
            fetchTasksWithRetry();
            setNotification("Task shared with team");
          }}
        />
      )}
    </motion.div>
  );
}

export default ViewTeamTasks;
