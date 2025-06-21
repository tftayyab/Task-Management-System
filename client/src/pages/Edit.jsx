import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios instance

function Edit() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    dueDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Edit';

    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setNewTask((prev) => ({ ...prev, username: rememberedUsername }));
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
    setIsEditing(true);
    setEditingTaskId(task._id);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateTask = async () => {
    const username = localStorage.getItem("username");
    const taskData = { ...newTask, username };

    await api.put(`/task/${editingTaskId}`, taskData);

    fetchTasks();
    setNewTask({
      title: '',
      description: '',
      status: 'In Progress',
      dueDate: ''
    });
    setIsEditing(false);
    setEditingTaskId(null);
    setSelectedTask(null);
  };

  const handleUpdate = async () => {
    try {
      await updateTask();
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const res = await api.get('/auth/refresh-token');
          const newToken = res.data.accessToken;
          localStorage.setItem('token', newToken);
          await updateTask(); // retry update
        } catch (refreshErr) {
          console.error('Refresh failed');
          navigate('/login');
        }
      } else {
        console.log(error);
      }
    }
  };

  const deleteTask = async (id) => {
    await api.delete(`/task/${id}`);
    fetchTasks();
    setSelectedTask(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const res = await api.get('/auth/refresh-token');
          const newToken = res.data.accessToken;
          localStorage.setItem('token', newToken);
          await deleteTask(id); // retry delete
        } catch (refreshErr) {
          console.error('Refresh failed');
          navigate('/login');
        }
      } else {
        console.log(error);
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
          <h4>Edit Task</h4>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleChange}
            placeholder="Description"
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
          <button onClick={handleUpdate}>Update Task</button>
          <button onClick={() => handleDelete(selectedTask._id)}>Delete</button>
        </>
      )}

      <hr />
      <button onClick={() => navigate('/tasks')}>View Tasks</button>
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Edit;
