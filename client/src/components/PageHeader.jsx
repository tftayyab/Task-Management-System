import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuIcon, SearchIcon } from './svg';
import { day, date } from '../utils/DayDate';
import Menu from './Menu';

const PageHeader = ({
  redTitle = '',
  blackTitle = '',
  tasks,
  setFilteredTasksList,
  setIsMenuOpen,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = redTitle + blackTitle;
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();

    const validTasks = tasks.filter(t =>
      t.status === 'Pending' || t.status === 'In Progress' || t.status === 'Completed'
    );

    if (!term) {
      setFilteredTasksList(validTasks);
    } else {
      const filtered = validTasks.filter(task =>
        [task.title, task.description, task.status, task.dueDate]
          .some(field => field?.toLowerCase().includes(term))
      );
      setFilteredTasksList(filtered);
    }
  }, [tasks, searchTerm]);

  return (
    <header className="relative w-full bg-[#fad3d3] shadow-md py-4 sm:py-6 px-4 sm:px-10 transition-all duration-300 z-10">
      <div className="hidden sm:block border-r border-gray-200">
        <Menu />
      </div>

      {showMenu && (
        <div className="sm:hidden">
          <Menu onClose={() => {
            setShowMenu(false);
            setIsMenuOpen(false);
          }} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="w-full relative flex items-center justify-center sm:justify-start">
          <button
            onClick={() => {
              setShowMenu(prev => !prev);
              setIsMenuOpen(!showMenu);
            }}
            className="absolute sm:hidden left-0 sm:static p-2 hover:bg-[#ffbfbf] rounded-full transition-all"
          >
            <MenuIcon />
          </button>

          <h1 className="text-[1.75rem] sm:text-[2.5rem] font-inter font-semibold text-center sm:text-left transition-all">
            <span className="text-[#FF6767]">{redTitle}</span>
            <span className="text-black">{blackTitle}</span>
          </h1>
        </div>

        <div className="flex sm:flex-row flex-col sm:gap-x-50 sm:items-end items-center gap-2 sm:mt-0 mt-2 w-full sm:w-auto">
          <div className="w-full sm:w-[50rem] max-w-full px-2 sm:px-0">
            <div className="relative flex items-center w-full">
              <SearchIcon className="absolute left-3 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                placeholder="Search by title, status, date..."
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6767] transition-all"
              />
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-black font-inter text-sm sm:text-base font-medium">{day}</p>
            <p className="text-[#3ABEFF] font-inter text-xs sm:text-sm font-medium">{date}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
