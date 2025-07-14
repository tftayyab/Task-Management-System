import { useEffect, useState } from 'react';
import { CrossIcon } from '../components/svg';
import { handleTaskSubmit } from '../utils/handleTasks';
import { enhanceTextWithAI } from '../utils/aiEnhancer';
import { motion } from 'framer-motion';
import {
  handleEnhanceField,
  animateTyping,
  handleReload,
} from '../utils/handleAI';


function TaskForm({
  mode = 'add',
  taskData = null,
  onClose,
  fetchTasksWithRetry,
  team = null,
  setNotification
}) {
  const [originalTitle, setOriginalTitle] = useState(document.title);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    dueDate: ''
  });

  const [loadingTitle, setLoadingTitle] = useState(false);
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [showReload, setShowReload] = useState({ title: false, description: false });

  useEffect(() => {
    setOriginalTitle(document.title);

    if (mode === 'edit' && taskData) {
      const formattedDate = taskData.dueDate?.slice(0, 10);
      setNewTask({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        dueDate: formattedDate,
      });
      localStorage.setItem('originalTitle', taskData.title);
      localStorage.setItem('originalDescription', taskData.description);
      document.title = 'Edit Task';
    } else {
      document.title = 'Add Task';
    }

    return () => {
      document.title = originalTitle;
      localStorage.removeItem('originalTitle');
      localStorage.removeItem('originalDescription');
    };
  }, [mode, taskData]);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 sm:px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="relative w-full sm:w-[90vw] max-w-3xl bg-[#F9F9F9] dark:bg-[#1e1e1e] text-black dark:text-white rounded-xl shadow-2xl p-4 sm:p-8 space-y-6"
    >
      {/* Close */}
      <div
        onClick={() => {
          onClose();
          localStorage.removeItem('originalTitle');
          localStorage.removeItem('originalDescription');
        }}
        className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-transform"
      >
        <CrossIcon className="w-6 h-6 text-black dark:text-white" />
      </div>

      {/* Header */}
      <div className="text-center">
        <p className="font-semibold text-xl sm:text-2xl">
          {mode === 'edit' ? 'Edit Task' : 'Add New Task'}
        </p>
        <div className="mt-1 mx-auto w-12 sm:w-20 h-1 bg-[#F24E1E] rounded-full" />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold mb-1">Title</label>
        <div className="relative">
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleUserInput}
            className="w-full pr-10 rounded-md border border-[#A1A3AB] dark:border-[#444] px-3 py-2 text-sm bg-white dark:bg-[#2a2a2a] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              hover:border-[#FFAFAF] focus:border-[#F24E1E]
              focus:outline-none focus:ring-1 focus:ring-[#F24E1E]
              transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2 items-center">
            {showReload.title && (
              <button
                type="button"
                onClick={() => handleReload('title', setNewTask)}
                className="text-blue-500 text-xs hover:underline"
              >
                🔄
              </button>
            )}
            <button
              type="button"
              onClick={() =>
                handleEnhanceField({
                  field: 'title',
                  newTask,
                  setNewTask,
                  setShowReload,
                  setLoadingTitle,
                  setLoadingDesc,
                })
              }
              className="text-[#F24E1E] hover:scale-110 transition-transform"
            >
              {loadingTitle ? '⏳' : '✨'}
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <div className="relative">
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleUserInput}
            rows="4"
            className="w-full pr-10 rounded-md border border-[#A1A3AB] dark:border-[#444] px-3 py-2 text-sm resize-none bg-white dark:bg-[#2a2a2a] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              hover:border-[#FFAFAF] focus:border-[#F24E1E]
              focus:outline-none focus:ring-1 focus:ring-[#F24E1E]
              transition-all"
          />
          <div className="absolute right-2 top-3 flex gap-2 items-center">
            {showReload.description && (
              <button
                type="button"
                onClick={() => handleReload('description', setNewTask)}
                className="text-blue-500 text-xs hover:underline"
              >
                🔄
              </button>
            )}
            <button
              type="button"
              onClick={() =>
                handleEnhanceField({
                  field: 'description',
                  newTask,
                  setNewTask,
                  setShowReload,
                  setLoadingTitle,
                  setLoadingDesc,
                })
              }
              className="text-[#F24E1E] hover:scale-110 transition-transform"
            >
              {loadingDesc ? '⏳' : '✨'}
            </button>
          </div>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-semibold mb-1">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleUserInput}
          className="w-full rounded-md border border-[#A1A3AB] dark:border-[#444] px-3 py-2 text-sm bg-white dark:bg-[#2a2a2a] text-black dark:text-white
            hover:border-[#FFAFAF] focus:border-[#F24E1E] focus:outline-none focus:ring-1 focus:ring-[#F24E1E] transition-all"
        />
      </div>

      {/* Status */}
      <div>
        <p className="text-sm font-semibold mb-2">Status</p>
        <div className="flex flex-wrap gap-4">
          {["Pending", "In Progress", "Completed"].map((status) => (
            <label
              key={status}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#F24E1E] transition-colors"
            >
              <input
                type="radio"
                name="status"
                value={status}
                checked={newTask.status === status}
                onChange={handleUserInput}
                className="accent-[#F24E1E] cursor-pointer"
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center sm:justify-start">
        <button
          onClick={() =>
            handleTaskSubmit({
              mode,
              newTask,
              taskData,
              fetchTasksWithRetry,
              onClose,
              setNewTask,
              team,
              setNotification,
            })
          }
          disabled={!newTask.title || !newTask.description || !newTask.dueDate}
          className={`bg-[#FF9090] hover:bg-[#FF6F6F] hover:scale-[1.03] text-white px-6 py-2 rounded-md text-sm font-medium shadow transition-all duration-300
            ${(!newTask.title || !newTask.description || !newTask.dueDate) && 'opacity-50 cursor-not-allowed'}`}
        >
          Done
        </button>
      </div>
    </motion.div>
  </div>
  );
}

export default TaskForm;
