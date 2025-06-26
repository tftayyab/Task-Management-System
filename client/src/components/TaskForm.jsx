import { useEffect, useState } from 'react';
import { CrossIcon } from '../components/svg';
import { handleChange, handleSubmit, handleUpdate } from '../utils/handleTasks';

function TaskForm({ mode = 'add', taskData = null, onClose, fetchTasksWithRetry }) {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    dueDate: ''
  });

  useEffect(() => {
    document.title = mode === 'edit' ? 'Edit Task' : 'Add Task';

    if (mode === 'edit' && taskData) {
      const formattedDate = taskData.dueDate?.slice(0, 10);
      setNewTask({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        dueDate: formattedDate
      });
    }

    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setNewTask(prev => ({ ...prev, username: rememberedUsername }));
    }
  }, [mode, taskData]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 sm:px-4">
      <div className="relative w-full sm:w-[90vw] max-w-3xl h-fit bg-[#F9F9F9] rounded-xl shadow-2xl p-4 sm:p-8 space-y-6">
        
        {/*  Close Icon */}
        <div onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
          <CrossIcon className="w-6 h-6 hover:scale-110 transition-transform" />
        </div>

        {/*  Header */}
        <div className="text-center">
          <p className="text-black font-semibold text-xl sm:text-2xl">
            {mode === 'edit' ? 'Edit Task' : 'Add New Task'}
          </p>
          <div className="mt-1 mx-auto w-12 sm:w-20 h-1 bg-[#F24E1E] rounded-full" />
        </div>

        {/*  Form */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-black mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTask.title}
              onChange={(e) => handleChange(e, setNewTask)}
              className="w-full rounded-md border border-[#A1A3AB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-400 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-black mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={newTask.description}
              onChange={(e) => handleChange(e, setNewTask)}
              rows="4"
              className="w-full rounded-md border border-[#A1A3AB] px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-400 transition-all"
            />
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-semibold text-black mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              value={newTask.dueDate}
              onChange={(e) => handleChange(e, setNewTask)}
              className="w-full rounded-md border border-[#A1A3AB] px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-400 transition-all"
            />
          </div>

          {/* Status */}
          <div>
            <p className="block text-sm font-semibold text-black mb-2">Status</p>
            <div className="flex flex-wrap gap-4">
              {["Pending", "In Progress", "Completed"].map((status) => (
                <label key={status} className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition">
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
        </div>

        {/*  Submit */}
        <div className="flex justify-center sm:justify-start">
          <button
            onClick={() =>
              mode === 'edit'
                ? handleUpdate({ newTask, taskData, fetchTasksWithRetry, onClose })
                : handleSubmit({ newTask, setNewTask, fetchTasksWithRetry, onClose })
            }
            disabled={!newTask.title || !newTask.description || !newTask.dueDate}
            className={`bg-[#FF9090] hover:bg-[#FF6F6F] active:scale-95 text-white px-6 py-2 rounded-md text-sm font-medium shadow transition-all
              ${(!newTask.title || !newTask.description || !newTask.dueDate) && 'opacity-50 cursor-not-allowed'}
            `}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
