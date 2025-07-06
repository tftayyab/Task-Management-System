import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tasks from '../components/Tasks';
import PageHeader from '../components/PageHeader';
import Menu from '../components/Menu';
import api from '../api';
import Edit from './EditTasks';
import useAuthToken from '../utils/useAuthToken';
import ShareTasks from './ShareTasks';


function ViewTasks() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
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
    if (id && filteredTasksList.length > 0) {
      const exists = filteredTasksList.some(task => task._id === id);
      setSelectedTaskId(exists ? id : null);
    } else if (!selectedTaskId && filteredTasksList.length > 0) {
      setSelectedTaskId(filteredTasksList[0]._id);
    }
  }, [id, filteredTasksList, selectedTaskId]);

  return (
    <div className="min-h-screen h-screen bg-white flex flex-col overflow-hidden">

      {/* ✅ Top Header */}
      <div className="w-full z-40">
        <PageHeader
          redTitle="Ta"
          blackTitle="sks"
          tasks={tasks}
          setTasks={setTasks}
          setFilteredTasksList={setFilteredTasksList}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>

      {/* ✅ Row: Menu + Main Box */}
      <div className="flex flex-row mt-[2rem] gap-x-20 sm:mt-[1rem]">

        {/* ✅ Left-side Menu */}
        <div className="hidden sm:block h-screen w-[16rem] z-50">
          <Menu />
        </div>

        {/* ✅ Task Preview Box */}
        <div className="flex-1 flex justify-center px-4 pb-6">
          {!isMenuOpen && (
            <div className="relative z-0 border sm:h-[76vh] border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 sm:w-[150vh] w-[40vh] bg-white transition-all duration-300">

              {/* 🔷 Right Side: Task Preview */}
              <div className="order-1 sm:order-2 w-full flex flex-col gap-6 mt-6 sm:mt-0">
                {selectedTaskId && (
                  <div className="h-[31rem] bg-[#F5F8FF] p-4 rounded-xl border border-[rgba(161,163,171,0.63)] shadow overflow-y-auto scrollbar-hide">
                 <Tasks
                    tasks={tasks}
                    task_id={selectedTaskId}
                    setEditTask={setEditTask}
                    fetchTasksWithRetry={fetchTasksWithRetry}
                    setShareTask={setShareTask}
                  />
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* ✅ Modal for Edit */}
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

export default ViewTasks;
