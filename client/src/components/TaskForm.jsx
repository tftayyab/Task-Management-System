import { useEffect, useState } from 'react';
import { CrossIcon } from '../components/svg';
import { handleChange, handleTaskSubmit } from '../utils/handleTasks';
import { enhanceTextWithAI } from '../utils/aiEnhancer';
import { motion } from 'framer-motion';

function TaskForm({ mode = 'add', taskData = null, onClose, fetchTasksWithRetry, team = null, setNotification }) {
  const [originalTitle, setOriginalTitle] = useState(document.title);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    dueDate: ''
  });

  const [loadingTitle, setLoadingTitle] = useState(false);
  const [loadingDesc, setLoadingDesc] = useState(false);
  const token = localStorage.getItem('token');

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
      document.title = 'Edit Task';
    } else {
      document.title = 'Add Task';
    }

    return () => {
      document.title = originalTitle;
    };
  }, [mode, taskData]);

  const handleAIEnhance = async (field) => {
    const fieldText = newTask[field];
    if (!fieldText || fieldText.length < 3) return;

    field === 'title' ? setLoadingTitle(true) : setLoadingDesc(true);

    try {
      const improved = await enhanceTextWithAI(fieldText, token);
      setNewTask((prev) => ({ ...prev, [field]: improved }));
    } catch (err) {
      alert('AI Enhance failed. Try again.');
    } finally {
      field === 'title' ? setLoadingTitle(false) : setLoadingDesc(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full sm:w-[90vw] max-w-3xl bg-[#F9F9F9] rounded-xl shadow-2xl p-4 sm:p-8 space-y-6"
      >
        {/* Close */}
        <div
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-transform"
        >
          <CrossIcon className="w-6 h-6" />
        </div>

        {/* Header */}
        <div className="text-center">
          <p className="text-black font-semibold text-xl sm:text-2xl">
            {mode === 'edit' ? 'Edit Task' : 'Add New Task'}
          </p>
          <div className="mt-1 mx-auto w-12 sm:w-20 h-1 bg-[#F24E1E] rounded-full" />
        </div>

        {/* Task Form */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Title</label>
            <div className="relative">
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={(e) => handleChange(e, setNewTask)}
                className="w-full pr-10 rounded-md border border-[#A1A3AB] px-3 py-2 text-sm
                           hover:border-[#FFAFAF] focus:border-[#F24E1E]
                           focus:outline-none focus:ring-1 focus:ring-[#F24E1E]
                           transition-all"
              />
              <button
                type="button"
                title="Enhance with AI"
                onClick={() => handleAIEnhance('title')}
                disabled={loadingTitle}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#F24E1E] text-sm hover:scale-110 transition-transform"
              >
                {loadingTitle ? '⏳' : '✨'}
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Description</label>
            <div className="relative">
              <textarea
                name="description"
                value={newTask.description}
                onChange={(e) => handleChange(e, setNewTask)}
                rows="4"
                className="w-full pr-10 rounded-md border border-[#A1A3AB] px-3 py-2 text-sm resize-none
                           hover:border-[#FFAFAF] focus:border-[#F24E1E]
                           focus:outline-none focus:ring-1 focus:ring-[#F24E1E]
                           transition-all"
              />
              <button
                type="button"
                title="Enhance with AI"
                onClick={() => handleAIEnhance('description')}
                disabled={loadingDesc}
                className="absolute right-2 top-3 text-[#F24E1E] text-sm hover:scale-110 transition-transform"
              >
                {loadingDesc ? '⏳' : '✨'}
              </button>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={(e) => handleChange(e, setNewTask)}
              className="w-full rounded-md border border-[#A1A3AB] px-3 py-2 text-sm
                         hover:border-[#FFAFAF] focus:border-[#F24E1E]
                         focus:outline-none focus:ring-1 focus:ring-[#F24E1E]
                         transition-all"
            />
          </div>

          {/* Status */}
          <div>
            <p className="text-sm font-semibold text-black mb-2">Status</p>
            <div className="flex flex-wrap gap-4">
              {["Pending", "In Progress", "Completed"].map((status) => (
                <label
                  key={status}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer
                             hover:text-[#F24E1E] transition-colors"
                >
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={newTask.status === status}
                    onChange={(e) => handleChange(e, setNewTask)}
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
        </div>
      </motion.div>
    </div>
  );
}

export default TaskForm;
