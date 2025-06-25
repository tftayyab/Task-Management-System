import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { CrossIcon } from '../components/svg';

function Edit({ taskData, onClose, fetchTasksWithRetry }) {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    dueDate: ''
  });

  const navigate = useNavigate();

 useEffect(() => {
  document.title = 'Edit Task';

  if (taskData) {
    const formattedDate = taskData.dueDate?.slice(0, 10); // ✅ "yyyy-MM-dd" format from ISO string

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
}, [taskData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
  try {
    const username = localStorage.getItem('username');
    const taskPayload = { ...newTask, username };

    await api.put(`/task/${taskData._id}`, taskPayload);

    // ✅ Refresh tasks after update
    if (fetchTasksWithRetry) {
      fetchTasksWithRetry();
    }

    // ✅ Close modal after update
    onClose?.();
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};


  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/40 px-4">
      <div className="relative w-full max-w-3xl sm:h-[40rem] bg-[#F9F9F9] rounded-xl shadow-2xl p-6 sm:p-10 space-y-6">
        
        {/* Close Icon */}
        <div
          className="absolute top-4 right-4 sm:top-6 sm:right-6 cursor-pointer"
          onClick={onClose}
        >
          <CrossIcon className="w-6 h-6 hover:scale-110 transition-transform" />
        </div>

        {/* Header */}
        <div className="text-center">
          <p className="text-black font-semibold text-xl sm:text-2xl">Edit Task</p>
          <div className="mt-1 mx-auto w-12 sm:w-20 h-1 bg-[#F24E1E] rounded-full" />
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-black mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTask.title}
              onChange={handleChange}
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
              onChange={handleChange}
              rows="4"
              className="w-full h-[10rem] rounded-md border border-[#A1A3AB] px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-400 transition-all"
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
              onChange={handleChange}
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
                    onChange={handleChange}
                    className="accent-orange-500"
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center sm:justify-start">
          <button
            onClick={handleUpdate}
            className="bg-[#FF9090] hover:bg-[#FF6F6F] active:scale-95 text-white px-6 py-2 rounded-md text-sm font-medium shadow transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
