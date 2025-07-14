import { motion } from 'framer-motion';
import api from '../api';

const Actions = ({ task, fetchTasksWithRetry, setEditTask, setShareTask, setNotification }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/task/${id}`);
      fetchTasksWithRetry();
      setNotification("Task deleted successfully");
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refreshRes = await api.get('/auth/refresh-token');
          const newToken = refreshRes.data.accessToken;
          localStorage.setItem('token', newToken);
          await api.delete(`/task/${id}`);
          fetchTasksWithRetry();
          setNotification("Task deleted successfully");
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col -mt-4 min-w-[6rem] bg-white dark:bg-[#1f1f1f] text-black dark:text-white rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden"
    >
      {/* ✏️ Edit */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setEditTask(task);
        }}
        className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-300 transition-all font-medium text-left"
      >
        ✏️ Edit
      </button>

      {/* 🗑️ Delete */}
      <button
        onClick={() => handleDelete(task._id)}
        className="px-4 py-2 text-sm whitespace-nowrap text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-800 dark:hover:text-red-300 transition-all font-medium text-left"
      >
        🗑️ Delete
      </button>

      {/* 🔗 Share */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShareTask(task);
        }}
        className="px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900 hover:text-purple-800 dark:hover:text-purple-300 transition-all font-medium text-left"
      >
        🔗 Share
      </button>
    </motion.div>
  );
};

export default Actions;
