import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import TaskList from '../components/TaskList';
import Tasks from '../components/Tasks';
import api from '../api';
import AddTasks from './AddTasks';
import Edit from './EditTasks';
import ShareTasks from './ShareTasks';
import useAuthToken from '../utils/useAuthToken';
import { motion } from 'framer-motion';

function MyTasks() {
  const {
    searchTerm,
    setSearchTerm,
    isMenuOpen,
    setIsMenuOpen,
    setNotification, // ✅ Get it from context
  } = useOutletContext();

  const location = useLocation();
  const taskIdFromState = location.state?.taskId || null;

  const [tasks, setTasks] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [shareTask, setShareTask] = useState(null);

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
      const username = localStorage.getItem('username');
      const res = await api.get(`/tasks?username=${username}`);
      setTasks(res.data);
      setFilteredTasksList(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskIdFromState) setSelectedTaskId(taskIdFromState);
  }, [taskIdFromState]);

  useEffect(() => {
    if (!selectedTaskId && filteredTasksList.length > 0) {
      setSelectedTaskId(filteredTasksList[0]._id);
    }
  }, [filteredTasksList, selectedTaskId]);

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
            <div className="relative z-0 h-[75vh] border sm:h-[76vh] border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 sm:w-[150vh] w-[40vh] bg-white transition-all duration-300">

              {/* 🔶 Task List */}
              <div className="order-2 -mt-5 sm:mt-0 sm:order-1 sm:h-full flex-1 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto scrollbar-hide">
                <TaskList
                  tasks={filteredTasksList}
                  statuses={["Pending", "In Progress", "Completed"]}
                  setEditTask={(task) => {
                    setEditTask(task);
                  }}
                  setShareTask={(task) => {
                    setShareTask(task);
                  }}
                  fetchTasksWithRetry={fetchTasksWithRetry}
                  loading={loading}
                  onTaskClick={(id) => setSelectedTaskId(id)}
                  searchTerm={searchTerm}
                  onAddTaskClick={() => {
                    setShowAddModal(true);
                  }}
                />
              </div>

              {/* 🔷 Task Preview */}
              <div className="order-1 sm:order-2 w-full sm:w-[30rem] flex flex-col gap-6 mt-6 sm:mt-0">
                <div className="hidden sm:block h-[31rem] bg-[#F5F8FF] p-4 rounded-xl border border-[rgba(161,163,171,0.63)] shadow overflow-y-auto scrollbar-hide">
                  {selectedTaskId ? (
                    <Tasks
                      tasks={tasks}
                      task_id={selectedTaskId}
                      setEditTask={(task) => {
                        setEditTask(task);
                      }}
                      fetchTasksWithRetry={fetchTasksWithRetry}
                    />
                  ) : (
                    <p className="text-center text-gray-500 mt-20">No task selected</p>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </motion.div>

      {/* ✅ Modals */}
      {showAddModal && (
        <AddTasks
          onClose={() => setShowAddModal(false)}
          fetchTasksWithRetry={() => {
            fetchTasksWithRetry();
            setNotification("✅ Task added successfully");
          }}
        />
      )}
      {editTask && (
        <Edit
          taskData={editTask}
          onClose={() => setEditTask(null)}
          fetchTasksWithRetry={() => {
            fetchTasksWithRetry();
            setNotification("✏️ Task updated successfully");
          }}
        />
      )}
      {shareTask && (
        <ShareTasks
          taskData={shareTask}
          onClose={() => setShareTask(null)}
          fetchTasksWithRetry={() => {
            fetchTasksWithRetry();
             setNotification("📤 Task shared with team!");
          }}
        />
      )}
    </motion.div>
  );
}

export default MyTasks;
