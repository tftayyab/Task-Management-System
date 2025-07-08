import api from '../api';

// 🔁 Handle input change for both Add and Edit
export const handleChange = (e, setNewTask) => {
  const { name, value } = e.target;
  setNewTask(prev => ({ ...prev, [name]: value }));
};

// ✅ Handle task creation
export const handleSubmit = async ({
  newTask,
  setNewTask,
  fetchTasksWithRetry,
  onClose,
  team = null,
  setNotification, // ✅ new
}) => {
  try {
    const payload = {
      ...newTask,
      teamIds: team ? [team._id] : [],
      shareWith:
        team?.shareWith?.filter(user => user !== localStorage.getItem('username')) || [],
    };

    await api.post('/tasks', payload);

    if (fetchTasksWithRetry) fetchTasksWithRetry();
    if (setNewTask) {
      setNewTask({
        title: '',
        description: '',
        status: 'In Progress',
        dueDate: '',
      });
    }
    if (onClose) onClose();
    if (setNotification) setNotification("✅ Task created!");
  } catch (error) {
    console.error("❌ Failed to submit task:", error);
    if (setNotification) setNotification("❌ Task creation failed!");
  }
};

// ✏️ Handle task update
export const handleUpdate = async ({
  newTask,
  taskData,
  fetchTasksWithRetry,
  onClose,
  team = null,
  setNotification, // ✅
}) => {
  try {
    const taskPayload = {
      ...newTask,
      teamIds: team ? [team._id] : taskData.teamIds || [],
    };

    await api.put(`/task/${taskData._id}`, taskPayload);

    if (fetchTasksWithRetry) fetchTasksWithRetry();
    if (onClose) onClose();
    if (setNotification) setNotification("✏️ Task updated!");
  } catch (error) {
    console.error("❌ Failed to update task:", error);
    if (setNotification) setNotification("❌ Task update failed!");
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

// 📝 Decides whether to submit a new task or update an existing one
export const handleTaskSubmit = ({
  mode,
  newTask,
  taskData,
  fetchTasksWithRetry,
  onClose,
  setNewTask,
  team = null,
  setNotification, // ✅
}) => {
  const owner = localStorage.getItem('username');

  const fullTask = {
    ...newTask,
    owner,
    shareWith: team?.shareWith || [],
    teamIds: team ? [team._id] : [],
  };

  if (mode === 'edit') {
    handleUpdate({
      newTask: fullTask,
      taskData,
      fetchTasksWithRetry,
      onClose,
      team,
      setNotification, // ✅ pass it
    });
  } else {
    handleSubmit({
      newTask: fullTask,
      setNewTask,
      fetchTasksWithRetry,
      onClose,
      team,
      setNotification, // ✅ pass it
    });
  }
};

// ❌ Delete task with token refresh fallback
export const handleDelete = async (id, setNotification) => {
  try {
    await api.delete(`/task/${id}`);
    if (setNotification) setNotification("🗑️ Task deleted!");
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await api.get('/auth/refresh-token');
        const newToken = refreshRes.data.accessToken;
        localStorage.setItem('token', newToken);
        await api.delete(`/task/${id}`);
        if (setNotification) setNotification("🗑️ Task deleted!");
      } catch (refreshError) {
        console.error('❌ Token refresh failed during delete');
        window.location.href = '/login';
        return;
      }
    } else {
      console.error('❌ Delete failed:', error);
      if (setNotification) setNotification("❌ Failed to delete task!");
      throw error;
    }
  }
};


