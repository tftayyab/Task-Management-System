import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios instance

function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'View Tasks';

    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      // No effect on your current logic, this line is kept as-is
    }

    fetchTasks();
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


  const fetchTasks = () => {
    const username = localStorage.getItem("username");
    api.get(`/tasks?username=${username}`)
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const deleteTask = async (id) => {
    await api.delete(`/task/${id}`);
    fetchTasks();
    setSelectedTask(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const res = await api.get('/auth/refresh-token');
          const newToken = res.data.accessToken;
          localStorage.setItem('token', newToken);
          await deleteTask(id); // Retry after refresh
        } catch (refreshErr) {
          console.error('Token refresh failed');
          navigate('/login');
        }
      } else {
        console.error(err);
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

export default ViewTasks;
