import api from '../api';

// 🔁 Handle input change for both Add and Edit
export const handleChange = (e, setNewTask) => {
  const { name, value } = e.target;
  setNewTask(prev => ({ ...prev, [name]: value }));
};

// ✅ Handle task creation
export const handleSubmit = async ({ newTask, setNewTask, fetchTasksWithRetry, onClose }) => {
  try {
    const username = localStorage.getItem("username");
    const taskData = { ...newTask, username };

    await api.post('/tasks', taskData);

    if (fetchTasksWithRetry) fetchTasksWithRetry();
    if (setNewTask) {
      setNewTask({
        title: '',
        description: '',
        status: 'In Progress',
        dueDate: ''
      });
    }
    if (onClose) onClose();
  } catch (error) {
    console.error("❌ Failed to submit task:", error);
  }
};

// ✏️ Handle task update
export const handleUpdate = async ({ newTask, taskData, fetchTasksWithRetry, onClose }) => {
  try {
    const username = localStorage.getItem('username');
    const taskPayload = { ...newTask, username };

    await api.put(`/task/${taskData._id}`, taskPayload);

    if (fetchTasksWithRetry) fetchTasksWithRetry();
    if (onClose) onClose();
  } catch (error) {
    console.error("❌ Failed to update task:", error);
  }
};

// 🚪 Handle logout
export const handleLogout = async (navigate) => {
  try {
    await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    console.error("❌ Logout request failed:", err);
  }

  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  navigate('/login');
};

