import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuIcon, SearchIcon } from './svg';
import { day, date } from '../utils/DayDate';
import api from '../api';
import Menu from './Menu';

const PageHeader = ({
  redTitle = '',
  blackTitle = '',
  tasks,
  setTasks,
  filteredTasksList,
  setFilteredTasksList,
  setIsMenuOpen,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const username = localStorage.getItem('username');
    const res = await api.get(`/tasks?username=${username}`);
    setTasks(res.data);
  };

  const fetchTasksWithRetry = async () => {
    try {
      await fetchTasks();
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        try {
          const refreshRes = await api.get('/auth/refresh-token');
          const newToken = refreshRes.data.accessToken;
          if (!newToken) throw new Error("No token received");
          localStorage.setItem('token', newToken);
          await fetchTasks();
        } catch (refreshError) {
          console.error("Refresh token invalid or expired:", refreshError);
          navigate('/login');
        }
      } else {
        console.error("Unexpected error:", error);
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    document.title = redTitle + blackTitle;
    fetchTasksWithRetry();
  }, []);

  useEffect(() => {
    setFilteredTasksList(
      tasks.filter(t => t.status === 'Pending' || t.status === 'In Progress')
    );
  }, [tasks]);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFilteredTasksList(
        tasks.filter(t => t.status === 'Pending' || t.status === 'In Progress')
      );
      return;
    }

    const filtered = tasks.filter(task =>
      [task.title, task.description, task.status, task.dueDate]
        .some(field => field?.toLowerCase().includes(term))
    );
    setFilteredTasksList(filtered);
  };

  return (
    <header className="relative w-full bg-[#fad3d3] shadow-md py-4 sm:py-6 px-4 sm:px-10 transition-all duration-300 z-10">
      {/* Desktop Sidebar */}
      <div className="hidden sm:block border-r border-gray-200">
        <Menu />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="sm:hidden">
          <Menu onClose={() => {
            setShowMenu(false);
            setIsMenuOpen(false);
          }} />
        </div>
      )}

      {/* Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Menu + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setShowMenu(prev => !prev);
              setIsMenuOpen(!showMenu);
            }}
            className="sm:hidden p-2 hover:bg-[#ffbfbf] rounded-full transition-all"
          >
            <MenuIcon />
          </button>

          <h1 className="text-[1.75rem] sm:text-[2.5rem] sm:-mr-15 font-inter ml-8 font-semibold text-center sm:text-left transition-all">
            <span className="text-[#FF6767]">{redTitle}</span>
            <span className="text-black">{blackTitle}</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-[100vh] flex items-center gap-2 px-2">
          <div className="relative flex items-center w-full">
            <SearchIcon className="absolute left-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              placeholder="Search by title, status, date..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6767] transition-all"
            />
          </div>
        </div>

        {/* Day & Date */}
        <div className="text-center sm:text-right mt-2 sm:mt-0">
          <p className="text-black font-inter text-sm sm:text-base font-medium">{day}</p>
          <p className="text-[#3ABEFF] font-inter text-xs sm:text-sm font-medium">{date}</p>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
