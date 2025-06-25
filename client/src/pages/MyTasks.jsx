import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AddIcon, TaskIcon
} from '../components/svg';
import TaskList from '../components/TaskList';
import Tasks from '../components/Tasks';
import PageHeader from '../components/PageHeader';
import api from '../api';
import AddTasks from './AddTasks'; // ✅ Import modal
import Edit from './Edit'; // or wherever you have it



function MyTasks() {
  const location = useLocation();
  const taskIdFromState = location.state?.taskId || null;

  const [tasks, setTasks] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ block render until token is handled
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null); // to hold the task being edited



  const navigate = useNavigate();

  useEffect(() => {
    const tryFetch = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        try {
          console.log("⏳ No token, trying to refresh...");
          const res = await api.get('/auth/refresh-token');
          const newToken = res.data.accessToken;
          localStorage.setItem('token', newToken);
          console.log("✅ Token refreshed");
        } catch (err) {
          console.error("🚫 Refresh failed:", err.response?.data || err.message);
          window.location.href = '/login';
          return; // stop here
        }
      }

      // ✅ Now safe to fetch
      fetchTasksWithRetry();
    };

    tryFetch();
  }, []);

  const fetchTasksWithRetry = async () => {
    try {
      const username = localStorage.getItem('username');
      console.log("📥 Fetching tasks for:", username);
      const res = await api.get(`/tasks?username=${username}`);
      setTasks(res.data);
      setFilteredTasksList(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false); // ✅ allow rendering now
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
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      {showAddModal && (
        <AddTasks
          onClose={() => setShowAddModal(false)} // ✅ close modal
          fetchTasksWithRetry={fetchTasksWithRetry} // ✅ reload tasks
        />
      )}
      {editTask && (
        <Edit
          taskData={editTask}
          onClose={() => setEditTask(null)} // close logic
          fetchTasksWithRetry={fetchTasksWithRetry}
        />
      )}

      <PageHeader
        redTitle="Ta"
        blackTitle="sks"
        tasks={tasks}
        setTasks={setTasks}
        setFilteredTasksList={setFilteredTasksList}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Content */}
      <div className="sm:w-[150vh] w-full sm:absolute sm:right-15 sm:-bottom-4 px-4 mt-5 sm:mt-10 pb-6">
        {!isMenuOpen && (
          <div className="relative z-0 border border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 w-full max-w-7xl mx-auto bg-white transition-all duration-300">

            {/* Left Side: Task List */}
            <div className="order-2 sm:order-1 flex-1 sm:mt-0 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto max-h-[70vh] scrollbar-hide">
              <div className="flex items-center justify-between mb-4">
                <div
                  onClick={() => navigate('/mytasks')}
                  className="flex items-center gap-x-2 cursor-pointer group"
                >
                  <TaskIcon className="w-4 h-4" />
                  <p className="text-[#FF6767] text-sm font-medium group-hover:underline">Tasks</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)} // ✅ open modal
                  className="flex items-center gap-x-2 text-sm text-[#A1A3AB] hover:text-[#FF6767] transition-all"
                >
                  <AddIcon className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </div>

              <TaskList
                tasks={filteredTasksList}
                statuses={["Pending", "In Progress", "Completed"]}
                setEditTask={setEditTask} // ✅ new prop
                fetchTasksWithRetry={fetchTasksWithRetry}
                onTaskClick={(id) => setSelectedTaskId(id)}
              />
            </div>

            {/* Right Side: Task Preview */}
            <div className="hidden sm:flex sm:order-2 w-full sm:w-[35rem] flex-col gap-6 mt-6 sm:mt-0">
              {selectedTaskId && (
                <div className="hidden sm:block h-[31rem] bg-[#F5F8FF] p-4 rounded-xl border border-[rgba(161,163,171,0.63)] shadow overflow-y-auto scrollbar-hide">
                  <Tasks
                    tasks={tasks}
                    task_id={selectedTaskId}
                    setEditTask={setEditTask}
                  />
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default MyTasks;
