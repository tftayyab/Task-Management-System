import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios instance

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard';

    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      // Optional: restore login UI state if needed in future
    }

    fetchTasksWithRetry();
  }, []);

  const handleLogout = async () => {
  try {
    await api.post('/auth/logout'); // Clear refresh cookie from backend
  } catch (err) {
    console.error('Logout error:', err);
  }

  // Clear localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  // Redirect to login
  navigate('/login');
};


  const fetchTasks = async () => {
    const username = localStorage.getItem('username');
    const res = await api.get(`/tasks?username=${username}`);
    setTasks(res.data);
  };

  const fetchTasksWithRetry = async () => {
    try {
      await fetchTasks();
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refreshRes = await api.get('/auth/refresh-token');
          const newToken = refreshRes.data.accessToken;
          localStorage.setItem('token', newToken);
          await fetchTasks(); // retry again
        } catch (refreshErr) {
          console.error('Token refresh failed', refreshErr);
          navigate('/login');
        }
      } else {
        console.error('Fetch failed:', error);
      }
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/task/${id}`);
      fetchTasksWithRetry();
      setSelectedTask(null);
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refreshRes = await api.get('/auth/refresh-token');
          const newToken = refreshRes.data.accessToken;
          localStorage.setItem('token', newToken);
          await api.delete(`/task/${id}`);
          fetchTasksWithRetry();
          setSelectedTask(null);
        } catch (refreshErr) {
          console.error('Token refresh failed on delete');
          navigate('/login');
        }
      } else {
        console.error('Delete error:', error);
      }
    }
  };

  return (
    <>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={task._id}>
            <button onClick={() => handleViewTask(task)}>Task {index + 1}</button>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <>
          <h4>Task Details</h4>
          <p><strong>Title:</strong> {selectedTask.title}</p>
          <p><strong>Description:</strong> {selectedTask.description}</p>
          <p><strong>Status:</strong> {selectedTask.status}</p>
          <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
          <button onClick={() => handleDelete(selectedTask._id)}>Delete</button>
          <button onClick={() => navigate('/edit')}>Edit</button>
        </>
      )}

      <hr />
      <button onClick={() => navigate('/addtasks')}>Add Task</button>
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Dashboard;
