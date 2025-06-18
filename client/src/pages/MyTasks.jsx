import { useEffect, useState } from 'react';
import api from '../api'; // Axios instance

function MyTasks() {
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

  // ✅ Fetch tasks
  const fetchTasks = () => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Submit (Create or Update)
  const handleSubmit = () => {
    if (isEditing) {
      api.put(`/task/${editingTaskId}`, newTask)
        .then(() => {
          fetchTasks();
          setNewTask({ title: '', description: '', status: 'In Progress', dueDate: '' });
          setIsEditing(false);
          setEditingTaskId(null);
        })
        .catch(err => console.log(err));
    } else {
      api.post('/tasks', newTask)
        .then(res => {
          setTasks(prev => [...prev, res.data.task]); // Access inside `task` object
          setNewTask({ title: '', description: '', status: 'In Progress', dueDate: '' });
        })
        .catch(err => console.log(err));
    }
  };

  // ✅ Delete
  const handleDelete = (id) => {
    api.delete(`/task/${id}`)
      .then(() => {
        fetchTasks();
        setSelectedTask(null);
      })
      .catch(err => console.log(err));
  };

  // ✅ View task
  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  // ✅ Edit task
  const handleEdit = (task) => {
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
          <button onClick={() => handleEdit(selectedTask)}>Edit</button>
        </>
      )}

      <hr />

      <h3>{isEditing ? 'Edit Task' : 'Add New Task'}</h3>
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

      <button onClick={handleSubmit}>{isEditing ? 'Update Task' : 'Submit Task'}</button>
    </>
  );
}

export default MyTasks;
