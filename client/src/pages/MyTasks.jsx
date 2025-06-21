import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios instance

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My Tasks';
    fetchTasks(); // call after mount
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout'); // Clear refresh cookie from backend
    } catch (err) {
      console.error('Logout error:', err);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('username');

    navigate('/login');
  };

  const fetchTasks = async () => {
    try {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");

      const res = await api.get(`/tasks?username=${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const refresh = await api.get('http://localhost:3000/auth/refresh-token', {
            withCredentials: true,
          });

          const newToken = refresh.data.accessToken;
          localStorage.setItem('token', newToken);

          const username = localStorage.getItem("username");
          const retryRes = await api.get(`/tasks?username=${username}`, {
            headers: {
              Authorization: `Bearer ${newToken}`
            }
          });

          setTasks(retryRes.data);
        } catch (refreshError) {
          console.error('Session expired. Please log in again.');
          alert('Session expired. Please log in again.');
          navigate('/login');
        }
      } else {
        console.error(err);
      }
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTasks();
      setSelectedTask(null);
    } catch (err) {
      console.log(err);
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
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default MyTasks;
