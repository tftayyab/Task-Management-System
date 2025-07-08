import { useEffect, useState } from 'react';
import { CrossIcon } from '../components/svg';
import { handleChange, handleSubmit, handleUpdate, handleTaskSubmit } from '../utils/handleTasks';
import { motion } from 'framer-motion';

function TaskForm({ mode = 'add', taskData = null, onClose, fetchTasksWithRetry, team = null }) {
  const [originalTitle, setOriginalTitle] = useState(document.title);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    dueDate: ''
  });

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

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full sm:w-[90vw] max-w-3xl bg-[#F9F9F9] rounded-xl shadow-2xl p-4 sm:p-8 space-y-6"
      >
        {/* Close */}
        <div onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
          <CrossIcon className="w-6 h-6 hover:scale-110 transition-transform" />
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
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={(e) => handleChange(e, setNewTask)}
              className="w-full rounded-md border border-[#A1A3AB] px-3 py-2 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={(e) => handleChange(e, setNewTask)}
              rows="4"
              className="w-full rounded-md border border-[#A1A3AB] px-3 py-2 text-sm resize-none"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={(e) => handleChange(e, setNewTask)}
              className="w-full rounded-md border border-[#A1A3AB] px-3 py-2 text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <p className="text-sm font-semibold text-black mb-2">Status</p>
            <div className="flex flex-wrap gap-4">
              {["Pending", "In Progress", "Completed"].map((status) => (
                <label key={status} className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={newTask.status === status}
                    onChange={(e) => handleChange(e, setNewTask)}
                    className="accent-orange-500"
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
                })
              }
              disabled={!newTask.title || !newTask.description || !newTask.dueDate}
              className={`bg-[#FF9090] hover:bg-[#FF6F6F] text-white px-6 py-2 rounded-md text-sm font-medium shadow transition-all
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
