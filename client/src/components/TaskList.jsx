import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleIcon, OptionIcon } from './svg';
import Actions from './actions';
import useIsMobile from '../utils/useScreenSize';
import { getDueLabel } from '../utils/DayDate';

function TaskList({ tasks, fetchTasksWithRetry, statuses = [], searchTerm = '', setEditTask, onTaskClick, mode = '' }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [openActionId, setOpenActionId] = useState(null);
  const clickTimeout = useRef(null);
  const search = searchTerm.toLowerCase().trim();

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenActionId(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const filtered = tasks.filter(task => {
    const matchesSearch = !search || [
      task.title?.toLowerCase(),
      task.description?.toLowerCase(),
      task.status?.toLowerCase(),
      task.dueDate
    ].some(field => field?.includes(search));

    if (search) return matchesSearch;
    return statuses.includes(task.status);
  });

  const strokeColors = ['#F21E1E', '#FFB347', '#3ABEFF', '#4CAF50'];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-lg font-inter">No Task</p>
      ) : (
        <ul className="flex flex-col gap-4 w-full h-full overflow-y-auto pr-1 scrollbar-hide">
          {filtered.map((task, index) => {
            const stroke = strokeColors[index] || '#4CAF50';

            return (
              <li
                key={task._id}
                onClick={() => {
                  if (isMobile) {
                    navigate(`/viewtask/${task._id}`);
                  } else {
                    onTaskClick?.(task._id);
                  }
                }}
                className="cursor-pointer group p-4 rounded-xl border border-[#A1A3AB] bg-white shadow transition-all duration-200 hover:shadow-lg hover:scale-[1.001] relative"
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
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
