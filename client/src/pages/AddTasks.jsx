import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios instance

function AddTasks() {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    dueDate: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Add Tasks';

    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setNewTask((prev) => ({ ...prev, username: rememberedUsername }));
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitTask = async () => {
    const username = localStorage.getItem("username");
    const taskData = { ...newTask, username };
    await api.post('/tasks', taskData);
    setNewTask({
      title: '',
      description: '',
      status: 'In Progress',
      dueDate: ''
    });
  };

  const handleSubmit = async () => {
    try {
      await submitTask();
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const res = await api.get('/auth/refresh-token');
          const newToken = res.data.accessToken;
          localStorage.setItem('token', newToken);
          await submitTask(); // Retry task submission
        } catch (refreshErr) {
          console.error('Refresh token failed');
          navigate('/login');
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h2>Add New Task</h2>

      <input
        type="text"
        placeholder="Title"
        name="title"
        value={newTask.title}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={newTask.description}
        onChange={handleChange}
      />

      <div>
        <label>
          <input
            type="radio"
            name="status"
            value="Pending"
            checked={newTask.status === 'Pending'}
            onChange={handleChange}
          />
          Pending
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="In Progress"
            checked={newTask.status === 'In Progress'}
            onChange={handleChange}
          />
          In Progress
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="Completed"
            checked={newTask.status === 'Completed'}
            onChange={handleChange}
          />
          Completed
        </label>
      </div>

      <p>Due Date</p>
      <input
        type="date"
        name="dueDate"
        value={newTask.dueDate}
        onChange={handleChange}
      />

      <br />
      <button onClick={handleSubmit}>Submit Task</button>
      <br /><br />
      <button onClick={() => navigate('/tasks')}>My Tasks</button>
      <button onClick={() => navigate('/edit')}>Edit</button>
      <button onClick={handleLogout}>
        Logout
      </button>

    </>
  );
}

export default AddTasks;
