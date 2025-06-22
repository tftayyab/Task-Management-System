import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import {
  AddIcon, CircleIcon, MenuIcon, SearchIcon,
  TaskIcon, OptionIcon
} from '../components/svg';
import TaskStatusCard from '../components/TaskStatusCard';
import Actions from '../components/actions'; 
import Menu from '../components/Menu'; 

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [openActionId, setOpenActionId] = useState(null);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const fetchTasks = async () => {
    const username = localStorage.getItem('username');
    const res = await api.get(`/tasks?username=${username}`);
    setTasks(res.data);
  };

  const fetchTasksWithRetry = async () => {
    try {
      await fetchTasks();
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refreshRes = await api.get('/auth/refresh-token');
          const newToken = refreshRes.data.accessToken;
          localStorage.setItem('token', newToken);
          await fetchTasks();
        } catch {
          navigate('/login');
        }
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/task/${id}`);
      setOpenActionId(null);
      fetchTasksWithRetry();
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refreshRes = await api.get('/auth/refresh-token');
          const newToken = refreshRes.data.accessToken;
          localStorage.setItem('token', newToken);
          await api.delete(`/task/${id}`);
          setOpenActionId(null);
          fetchTasksWithRetry();
        } catch {
          navigate('/login');
        }
      }
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const getDueLabel = (dueDateStr) => {
    const today = new Date();
    const [dd, mm, yyyy] = dueDateStr.split('/');
    const due = new Date(`${yyyy}-${mm}-${dd}`);
    const diff = (due - today) / (1000 * 60 * 60 * 24);
    const rounded = Math.round(diff);
    if (rounded === 0) return 'Today';
    if (rounded === -1) return 'Yesterday';
    if (rounded === 1) return 'Tomorrow';
    if (rounded > 1) return 'Later';
    return 'Old';
  };

  const toggleActions = (taskId, event) => {
    if (openActionId === taskId) {
      setOpenActionId(null);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const spaceAbove = rect.top > 120;
    const top = spaceAbove ? rect.top - 80 : rect.bottom + window.scrollY;
    const left = rect.left;
    setActionPosition({ top, left });
    setOpenActionId(taskId);
  };

  useEffect(() => {
    document.title = 'Dashboard';
    fetchTasksWithRetry();
  }, []);

  const filteredTasks = tasks.filter(t => t.status === 'Pending' || t.status === 'In Progress');

  return (
    <div className="flex flex-col bg-[#F8F8F8] min-h-screen px-4">
        {showMenu && (
          <div className="absolute top-0 left-0 z-50">
            <Menu />
          </div>
        )}
      {/* Header */}
      <div className="relative w-full flex items-center pt-4">
        <div className="w-12 h-12">
          <button onClick={() => setShowMenu(prev => !prev)}>
            <MenuIcon />
          </button>
        </div>
        <p className="absolute left-1/2 transform -translate-x-1/2 font-inter text-[2rem] font-semibold">
          <span className="text-[#FF6767]">Dash</span><span className="text-black">Board</span>
        </p>
      </div>

      {/* Search */}
      <div className="w-full flex justify-center items-center mt-7">
        <div className="relative">
          <input
            type="text"
            placeholder="Search your text here..."
            className="w-[18.5625rem] h-9 rounded-lg bg-white pl-4 pr-12 font-montserrat text-[0.75rem] font-semibold text-[#A1A3AB] placeholder-[#A1A3AB]"
          />
          <button className="absolute right-0 top-0 w-[2rem] h-9 flex items-center justify-center">
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* Task Status */}
      <div className="flex flex-col items-center mt-5">
        <div className="w-20 flex justify-center px-4 mt-6">
          <TaskStatusCard tasks={tasks} />
        </div>

        {/* Task Title & Add Button */}
        <div className="flex items-center justify-between w-full mt-10 px-2">
          <div className="flex items-center gap-x-2 cursor-pointer" onClick={() => navigate('/tasks')}>
            <TaskIcon className="w-[1rem] h-[1rem]" />
            <p className="text-[#FF6767] text-[0.9375rem] font-medium font-inter">Tasks</p>
          </div>
          <button onClick={() => navigate('/addtasks')}>
            <div className="flex items-center gap-x-1">
              <AddIcon className="w-[1rem] h-[0.7rem]" />
              <p className="text-[#A1A3AB] text-[0.75rem] font-inter">Add Tasks</p>
            </div>
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <ul className="mt-4 flex flex-col gap-4">
        {filteredTasks.map((task) => (
          <li key={task._id} className="p-3 w-full rounded-[0.875rem] border border-[#A1A3AB] bg-white shadow relative">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-x-2">
                <CircleIcon className="flex-shrink-0 mt-1" />
                <p className="text-black font-inter text-[1.125rem] font-semibold">{task.title}</p>
              </div>

              <div className="relative">
                <button onClick={(e) => {
                  e.stopPropagation();
                  setOpenActionId(prev => (prev === task._id ? null : task._id));
                }}>
                  <OptionIcon />
                </button>

                {/* Conditionally show actions for this task only */}
                {openActionId === task._id && (
                  <div className="absolute z-50 right-0 mt-2">
                    <Actions task={task} fetchTasksWithRetry={fetchTasksWithRetry} />
                  </div>
                )}
              </div>
            </div>

            <p className="text-[#747474] text-[0.875rem] mt-1">{task.description}</p>

            <div className="flex justify-between mt-2">
              <p className="text-[#F21E1E] text-[0.625rem]">
                <span className="text-black">Status:</span> {task.status}
              </p>
              <p className="text-[#A1A3AB] text-[0.625rem]">{getDueLabel(task.dueDate)}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <button onClick={handleLogout} className="text-sm mt-10 text-[#FF6767] underline self-center">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
