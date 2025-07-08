import { useNavigate } from 'react-router-dom';
import { DeleteTasksIcon, EditTasksIcon, ShareIcon } from './svg';
import { formatDueDate } from '../utils/DayDate';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { handleDelete } from '../utils/handleTasks';

function Tasks({
  tasks,
  fetchTasksWithRetry,
  statuses = [],
  searchTerm = '',
  task_id = null,
  setEditTask,
  setShareTask,
  loading = false,
}) {
  const navigate = useNavigate();
  const search = searchTerm.toLowerCase().trim();

  const filtered = tasks.filter((task) => {
    if (task_id) return task._id === task_id;

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
    <>
      {loading ? (
        <div className="flex-1 flex items-center justify-center py-10">
          {/* Tailwind-based loader (same as TaskList.jsx) */}
          <div className="w-10 h-10 border-4 border-dashed border-[#FF9090] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ul className="flex flex-col gap-4 w-full h-full overflow-y-auto pr-1 scrollbar-hide">
          <AnimatePresence>
            {filtered.map((task) => (
              <motion.li
                key={task._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate(`/viewtask/${task._id}`)}
                className="group h-full p-4 rounded-xl border border-[#A1A3AB] bg-white shadow transition-all duration-200 hover:shadow-lg hover:scale-[1.001] relative cursor-pointer"
              >
                <p className="text-black font-inter text-base font-semibold break-words max-w-[12rem] sm:max-w-none">
                  {task.title}
                </p>

                <div className="flex flex-col justify-between items-start mt-3 gap-y-2 text-xs">
                  <p className="text-[#F21E1E]">
                    <span className="text-black">Status:</span> {task.status}
                  </p>
                  <p className="text-[#A1A3AB]">
                    <span className="text-black">Due Date: </span>
                    {formatDueDate(task.dueDate)}
                  </p>
                </div>

                <p className="text-[#747474] text-sm mt-2 break-words">{task.description}</p>

                <div className="absolute bottom-4 right-4 flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    className="hover:text-red-500 hover:scale-110 transition-transform"
                    onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await handleDelete(task._id);
                      await fetchTasksWithRetry();
                      navigate('/mytasks');
                    } catch (err) {
                      console.error('Delete failed:', err);
                    }
                  }}
                  >
                    <DeleteTasksIcon className="w-8 h-8" />
                  </button>

                  <button
                    type="button"
                    className="hover:text-blue-500 hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditTask(task);
                    }}
                  >
                    <EditTasksIcon className="w-8 h-8" />
                  </button>

                  <button
                    type="button"
                    className="hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      const taskToShare = tasks.find((t) => t._id === task._id);
                      if (taskToShare) {
                        setShareTask(taskToShare);
                      }
                    }}
                  >
                    <ShareIcon className="w-8 h-8" />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </>
  );
}

export default Tasks;
