import { useState } from 'react';
import { CircleIcon, DeleteTasksIcon, EditTasksIcon, OptionIcon } from './svg';
import handleDelete from './actions';

function Tasks({ tasks, fetchTasksWithRetry, statuses = [], searchTerm = '', task_id = null }) {
  const [openActionId, setOpenActionId] = useState(null);

  const search = searchTerm.toLowerCase().trim();

  const filtered = tasks.filter(task => {
    // If task_id is provided, only match that one
    if (task_id) return task._id === task_id;

    // Otherwise apply search and status filtering
    const matchesSearch = !search || [
      task.title?.toLowerCase(),
      task.description?.toLowerCase(),
      task.status?.toLowerCase(),
      task.dueDate
    ].some(field => field?.includes(search));

    if (search) return matchesSearch;

    return statuses.includes(task.status);
  });

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

  function formatDueDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
    }

  return (
    <ul className="flex flex-col gap-4 w-full h-full overflow-y-auto pr-1 scrollbar-hide">
      {filtered.map((task) => (
        <li
          key={task._id}
          className="group p-4 h-full rounded-xl border border-[#A1A3AB] bg-white shadow transition-all duration-200 hover:shadow-lg hover:scale-[1.001] relative"
        >
          {/* Top Row */}
          <div className="flex justify-between items-start gap-2 flex-wrap">
            <p className="text-black font-inter text-base font-semibold break-words max-w-[12rem] sm:max-w-none">
              {task.title}
            </p>
          </div>

        {/* Status + Due */}
          <div className="flex flex-col justify-between items-start mt-3 gap-y-2 text-xs">
            <p className="text-[#F21E1E]">
              <span className="text-black">Status:</span> {task.status}
            </p>
            <p className="text-[#A1A3AB]"><span  className="text-black">Due Date: </span>{formatDueDate(task.dueDate)}</p>
          </div>


          {/* Description */}
          <p className="text-[#747474] text-sm mt-2 break-words">{task.description}</p>

         {/* Action Buttons - Bottom Right */}
          <div className="absolute bottom-4 right-4 flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              className="hover:text-red-500 hover:scale-110 transition-transform"
              onClick={() => handleDelete(task._id)}
            >
              <DeleteTasksIcon className="w-5 h-5" />
            </button>
            <button
              className="hover:text-blue-500 hover:scale-110 transition-transform"
              onClick={() => navigate('/edit', { state: { task } })}
            >
              <EditTasksIcon className="w-5 h-5" />
            </button>
          </div>

        </li>
      ))}
    </ul>
  );
}

export default Tasks;
