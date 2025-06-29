import { useNavigate } from 'react-router-dom';
import { DeleteTasksIcon, EditTasksIcon } from './svg';
import { formatDueDate } from '../utils/DayDate';
import api from '../api'; 


function Tasks({
  tasks,
  fetchTasksWithRetry,
  statuses = [],
  searchTerm = '',
  task_id = null,
  setEditTask, // ✅ Add this
}) {

  const navigate = useNavigate();
  const search = searchTerm.toLowerCase().trim();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/task/${id}`);
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refreshRes = await api.get('/auth/refresh-token');
          const newToken = refreshRes.data.accessToken;
          localStorage.setItem('token', newToken);
          await api.delete(`/task/${id}`);
        } catch (refreshError) {
          console.error('❌ Token refresh failed during delete');
          window.location.href = '/login';
          return;
        }
      } else {
        console.error('❌ Delete failed:', error);
        throw error;
      }
    }
  };


  const filtered = tasks.filter(task => {
    if (task_id) return task._id === task_id;

    const matchesSearch = !search || [
      task.title?.toLowerCase(),
      task.description?.toLowerCase(),
      task.status?.toLowerCase(),
      task.dueDate
    ].some(field => field?.includes(search));

    if (search) return matchesSearch;
    return statuses.includes(task.status);
  });

  return (
    <>
      <ul className="flex flex-col gap-4 w-full h-full overflow-y-auto pr-1 scrollbar-hide">
        {filtered.map((task) => (
          <li
            key={task._id}
            onClick={() => navigate(`/viewtask/${task._id}`)} // ✅ View Task on click
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
                <span className="text-black">Due Date: </span>{formatDueDate(task.dueDate)}
              </p>
            </div>

            <p className="text-[#747474] text-sm mt-2 break-words">{task.description}</p>

              <div className="absolute bottom-4 right-4 flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                className="hover:text-red-500 hover:scale-110 transition-transform"
                onClick={async (e) => {
                  e.stopPropagation(); // ✅ prevent task view

                  try {
                    await handleDelete(task._id);      //  delete from server
                    await fetchTasksWithRetry();       //  refresh UI 
                    navigate('/mytasks');              // redirect to /mytasks
                  } catch (err) {
                    console.error("Delete failed:", err);
                  }
                }}
              >
                <DeleteTasksIcon className="w-8 h-8" />
              </button>
                <button
                type="button"
                  className="hover:text-blue-500 hover:scale-110 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ stop from triggering view
                    setEditTask(task);
                  }}
                >
                  <EditTasksIcon className="w-8 h-8" />
                </button>
              </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tasks;
