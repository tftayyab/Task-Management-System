import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AddIcon, TaskIcon
} from '../components/svg';
import TaskList from '../components/TaskList';
import Tasks from '../components/Tasks';
import PageHeader from '../components/PageHeader';
import Menu from '../components/Menu';
import api from '../api';
import AddTasks from './AddTasks';
import Edit from './EditTasks';
import useAuthToken from '../utils/useAuthToken';
import ShareTasks from './ShareTasks';

function MyTasks() {
  const location = useLocation();
  const taskIdFromState = location.state?.taskId || null;

  const [tasks, setTasks] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [shareTask, setShareTask] = useState(null); // ✅ NEW
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="min-h-screen h-screen bg-white flex flex-col overflow-hidden">

      {/* ✅ Top Header */}
      <div className="w-full z-40">
        <PageHeader
          redTitle="My"
          blackTitle="Tasks"
          tasks={tasks}
          setTasks={setTasks}
          setFilteredTasksList={setFilteredTasksList}
          setIsMenuOpen={setIsMenuOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* ✅ Row: Menu + Main Content Box */}
      <div className="flex flex-row mt-[2rem] gap-x-20 sm:mt-[1rem]">

        {/* ✅ Menu */}
        <div className="hidden sm:block h-screen w-[16rem] z-50">
          <Menu />
        </div>

        {/* ✅ Main Content */}
        <div className="flex-1 flex justify-center px-4 pb-6">
          {!isMenuOpen && (
            <div className="relative z-0 border sm:h-[76vh] border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 sm:w-[150vh] w-[40vh] bg-white transition-all duration-300">

              {/* 🔶 Task List */}
              <div className="order-2 sm:order-1 sm:h-full flex-1 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto scrollbar-hide">

                <TaskList
                  tasks={filteredTasksList}
                  statuses={["Pending", "In Progress", "Completed"]}
                  setEditTask={setEditTask}
                  setShareTask={setShareTask} // ✅ NEW
                  fetchTasksWithRetry={fetchTasksWithRetry}
                  onTaskClick={(id) => setSelectedTaskId(id)}
                  searchTerm={searchTerm}
                  onAddTaskClick={() => setShowAddModal(true)}
                />
              </div>

              {/* 🔷 Task Preview */}
              <div className="order-1 sm:order-2 w-full sm:w-[30rem] flex flex-col gap-6 mt-6 sm:mt-0">
                <div className="hidden sm:block h-[31rem] bg-[#F5F8FF] p-4 rounded-xl border border-[rgba(161,163,171,0.63)] shadow overflow-y-auto scrollbar-hide">
                  {selectedTaskId ? (
                    <Tasks
                      tasks={tasks}
                      task_id={selectedTaskId}
                      setEditTask={setEditTask}
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
      </div>

      {/* ✅ Modals */}
      {showAddModal && (
        <AddTasks
          onClose={() => setShowAddModal(false)}
          fetchTasksWithRetry={fetchTasksWithRetry}
        />
      )}
      {editTask && (
        <Edit
          taskData={editTask}
          onClose={() => setEditTask(null)}
          fetchTasksWithRetry={fetchTasksWithRetry}
        />
      )}
      {shareTask && (
        <ShareTasks
          taskData={shareTask}
          onClose={() => setShareTask(null)}
          fetchTasksWithRetry={fetchTasksWithRetry}
        />
      )}
    </div>
  );
}

export default MyTasks;
