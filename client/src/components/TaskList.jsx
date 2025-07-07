import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleIcon, OptionIcon, AddIcon, TaskIcon } from './svg';
import Actions from './actions';
import useIsMobile from '../utils/useScreenSize';
import { getDueLabel } from '../utils/DayDate';
import { motion, AnimatePresence } from 'framer-motion';

function TaskList({
  tasks,
  fetchTasksWithRetry,
  statuses = [],
  searchTerm = '',
  setEditTask,
  onTaskClick,
  onAddTaskClick,
  mode = '',
  setShareTask,
  loading = false,
}) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [openActionId, setOpenActionId] = useState(null);
  const clickTimeout = useRef(null);

  const search = searchTerm.toLowerCase().trim();
  const strokeColors = ['#F21E1E', '#FFB347', '#3ABEFF', '#4CAF50'];

  useEffect(() => {
    const handleClickOutside = () => setOpenActionId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const filtered = tasks.filter((task) => {
    const matchesSearch =
      !search ||
      [
        task.title?.toLowerCase(),
        task.description?.toLowerCase(),
        task.status?.toLowerCase(),
        task.dueDate,
      ].some((field) => field?.includes(search));
    if (search) return matchesSearch;
    return statuses.includes(task.status);
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      {!(statuses.length === 1 && statuses[0]?.toLowerCase() === 'completed') && (
        <div className="flex items-center justify-between mb-4">
          <div
            onClick={() => navigate('/mytasks')}
            className="flex items-center gap-x-2 cursor-pointer group"
          >
            <TaskIcon className="w-4 h-4" />
            <p className="text-[#FF6767] text-sm font-medium group-hover:underline">Tasks</p>
          </div>

          <button
            onClick={() => onAddTaskClick?.()}
            className="flex items-center gap-x-2 text-sm text-[#A1A3AB] hover:text-[#FF6767] transition-all"
          >
            <AddIcon className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      )}

      {/* Loading, Empty, or Tasks */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-dashed border-[#FF9090] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-gray-400 text-lg font-inter mb-2">No Tasks Found</p>
          <button
            onClick={() => onAddTaskClick?.()}
            className="text-[#FF6767] font-medium hover:underline mt-1"
          >
            + Add Task
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-4 w-full h-full overflow-y-auto pr-1 scrollbar-hide">
          <AnimatePresence>
            {filtered.map((task, index) => {
              const stroke = strokeColors[index % strokeColors.length];
              return (
                <motion.li
                  key={task._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    if (isMobile) {
                      navigate(`/viewtask/${task._id}`);
                    } else {
                      onTaskClick?.(task._id);
                    }
                  }}
                  className={`cursor-pointer group p-4 rounded-xl border border-[#A1A3AB] bg-white shadow transition-all duration-200 hover:shadow-lg hover:scale-[1.001] relative ${
                    openActionId === task._id ? 'z-[60]' : 'z-10'
                  }`}
                >
                  {/* Top Row */}
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <CircleIcon className="flex-shrink-0 mt-1 w-4 h-4" stroke={stroke} />
                      <p
                        className="text-black font-inter text-base font-semibold truncate"
                        title={task.title}
                      >
                        {task.title}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="relative hidden sm:block flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenActionId((prev) => (prev === task._id ? null : task._id));
                        }}
                        className="hover:scale-110 transition-transform p-4"
                        type="button"
                      >
                        <OptionIcon />
                      </button>

                      {openActionId === task._id && (
                        <div className="absolute z-50 right-0 mt-2">
                          <Actions
                            task={task}
                            fetchTasksWithRetry={fetchTasksWithRetry}
                            setEditTask={setEditTask}
                            setShareTask={setShareTask}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#747474] text-sm mt-2 break-words line-clamp-2 overflow-hidden text-ellipsis">
                    {task.description}
                  </p>

                  {/* Status + Due */}
                  <div className="flex justify-between items-center mt-3 text-xs">
                    <p className="text-[#F21E1E]">
                      <span className="text-black">Status:</span> {task.status}
                    </p>
                    <p className="text-[#A1A3AB]">{getDueLabel(task.dueDate)}</p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

export default TaskList;
