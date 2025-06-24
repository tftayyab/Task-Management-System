import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TaskIcon
} from '../components/svg';
import TaskList from '../components/TaskList';
import Tasks from '../components/Tasks';
import PageHeader from '../components/PageHeader';
import api from '../api';

function ViewTasks() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ block render until token is handled

  const navigate = useNavigate();

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const username = localStorage.getItem('username');
      console.log("📥 Fetching tasks for:", username);
      const res = await api.get(`/tasks?username=${username}`);
      setTasks(res.data);
      setFilteredTasksList(res.data);
    } catch (err) {
      console.error("❌ Fetch error in MyTasks:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, []);



  useEffect(() => {
    if (id && filteredTasksList.length > 0) {
      const exists = filteredTasksList.some(task => task._id === id);
      setSelectedTaskId(exists ? id : null);
    } else if (!selectedTaskId && filteredTasksList.length > 0) {
      setSelectedTaskId(filteredTasksList[0]._id);
    }
  }, [id, filteredTasksList, selectedTaskId]);


  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
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

            {/* Left side could be added here if needed (TaskList, etc.) */}

            {/* Right Side: Task Preview */}
            <div className="hidden sm:flex sm:order-2 w-full sm:w-[35rem] flex-col gap-6 mt-6 sm:mt-0">
              {selectedTaskId && (
                <div className="hidden sm:block sm:w-[140vh] h-[31rem] bg-[#F5F8FF] p-4 rounded-xl border border-[rgba(161,163,171,0.63)] shadow overflow-y-auto scrollbar-hide">
                  <Tasks
                    tasks={tasks}
                    task_id={selectedTaskId}
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

export default ViewTasks;
