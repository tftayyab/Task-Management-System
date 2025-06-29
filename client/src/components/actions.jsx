import api from '../api';

const Actions = ({ task, fetchTasksWithRetry, setEditTask }) => {
  
  const handleDelete = async (id) => {
    try {
      await api.delete(`/task/${id}`);
      fetchTasksWithRetry();
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refreshRes = await api.get('/auth/refresh-token');
          const newToken = refreshRes.data.accessToken;
          localStorage.setItem('token', newToken);
          await api.delete(`/task/${id}`);
          fetchTasksWithRetry();
        } catch {
          console.error('Token refresh failed on delete');
          window.location.href = '/login';
        }
      } else {
        console.error('Delete error:', error);
      }
    }
  };

  return (
    <div className="flex flex-col min-w-[6rem] bg-white rounded-xl shadow-lg ring-1 ring-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🛑 prevent parent <li> click
          setEditTask(task);   // ✅ open edit modal only
        }}
        className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition-all font-medium text-left"
      >
        ✏️ Edit
      </button>

      <button
        onClick={() => handleDelete(task._id)}
        className="px-4 whitespace-nowrap py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-800 transition-all font-medium text-left"
      >
        🗑️ Delete
      </button>
    </div>
  );
};

export default Actions;
