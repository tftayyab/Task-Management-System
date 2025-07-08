import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { CompletedTasksIcon } from '../components/svg';
import TaskStatusCard from '../components/TaskStatusCard';
import TaskList from '../components/TaskList';
import AddTasks from './AddTasks';
import Edit from './EditTasks';
import ShareTasks from './ShareTasks';
import api from '../api';
import useIsMobile from '../utils/useScreenSize';
import useAuthToken from '../utils/useAuthToken';
import { motion } from 'framer-motion';

function Dashboard() {
  const {
    searchTerm,
    setSearchTerm,
    isMenuOpen,
    setIsMenuOpen,
    setNotification, // ✅ Access from context
  } = useOutletContext();

  const [tasks, setTasks] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [shareTask, setShareTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useAuthToken();

  useEffect(() => {
    document.title = 'Dashboard';
    fetchTasksWithRetry();
  }, []);

  const fetchTasksWithRetry = async () => {
    setLoading(true);
    try {
      const username = localStorage.getItem('username');
      const res = await api.get(`/tasks?username=${username}`);
      setTasks(res.data);
      setFilteredTasksList(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch tasks:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdd = () => {
    setShowAddModal(true);
  };

  const handleTaskEdit = (task) => {
    setEditTask(task);
  };

  const handleTaskShare = (task) => {
    setShareTask(task);
  };

  return (
    <motion.div
      className="min-h-screen h-screen bg-white flex flex-col overflow-hidden"
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
            <div className="relative z-0 border sm:h-[76vh] border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 sm:w-[150vh] w-[40vh] bg-white transition-all duration-300">
              {/* Task List */}
              <div className="order-2 sm:order-1 sm:h-full flex-1 mt-7 sm:mt-0 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto max-h-[75vh] scrollbar-hide">
                <TaskList
                  tasks={filteredTasksList}
                  mode="dashboard"
                  loading={loading}
                  setShareTask={handleTaskShare} // ✅ setNotification inside
                  fetchTasksWithRetry={fetchTasksWithRetry}
                  statuses={['Pending', 'In Progress']}
                  onAddTaskClick={handleTaskAdd}
                  onTaskClick={(id) => {
                    if (isMobile) {
                      const taskToEdit = tasks.find((task) => task._id === id);
                      if (taskToEdit) handleTaskEdit(taskToEdit);
                    } else {
                      navigate(`/mytasks?taskId=${id}`);
                    }
                  }}
                  setEditTask={handleTaskEdit}
                  searchTerm={searchTerm}
                />
              </div>

              {/* Completed Tasks */}
              <div className="order-1 sm:order-2 w-full sm:w-[22rem] flex flex-col gap-6 mt-6 sm:mt-0">
                <div className="flex justify-center sm:justify-start">
                  <TaskStatusCard tasks={tasks} />
                </div>

                <div className="hidden sm:block h-[40vh] bg-[#F5F8FF] p-4 rounded-xl border border-[rgba(161,163,171,0.63)] shadow overflow-y-auto max-h-[50vh] scrollbar-hide">
                  <div className="flex flex-row gap-x-2">
                    <CompletedTasksIcon className="w-4 h-4" />
                    <p className="text-[#F24E1E] font-medium text-sm mb-2">
                      Completed Tasks
                    </p>
                  </div>

                  <TaskList
                    tasks={tasks}
                    fetchTasksWithRetry={fetchTasksWithRetry}
                    statuses={['Completed']}
                    setShareTask={handleTaskShare}
                    mode="dashboard"
                    loading={loading}
                    onTaskClick={(id) => {
                      if (isMobile) {
                        const taskToEdit = tasks.find((task) => task._id === id);
                        if (taskToEdit) handleTaskEdit(taskToEdit);
                      } else {
                        navigate(`/mytasks?taskId=${id}`);
                      }
                    }}
                    setEditTask={handleTaskEdit}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modals */}
      {showAddModal && (
        <AddTasks
          onClose={() => setShowAddModal(false)}
          fetchTasksWithRetry={() => {
            fetchTasksWithRetry();
            setNotification('Task created successfully');
          }}
        />
      )}

      {editTask && (
        <Edit
          taskData={editTask}
          onClose={() => setEditTask(null)}
          fetchTasksWithRetry={() => {
            fetchTasksWithRetry();
            setNotification('Task updated successfully');
          }}
        />
      )}

      {shareTask && (
        <ShareTasks
          taskData={shareTask}
          onClose={() => setShareTask(null)}
          fetchTasksWithRetry={() => {
            fetchTasksWithRetry();
            setNotification('Task shared with team');
          }}
        />
      )}
    </motion.div>
  );
}

export default Dashboard;
