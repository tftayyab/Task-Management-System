import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function AllTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/tasks') // sends a GET request to Backend address
      .then(res => res.json()) // convert the data from backend to json
      .then(data => setTasks(data)) // save that json to data variable 
      .catch(err => console.log(err)); //catch error
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' }) //Sends a DELETE request to your backend.
      .then(res => res.json())
      .then(() => setTasks(tasks.filter(t => t._id !== id))); // update a new array with deleted task
  };

  return (
    <div>
      <h1>All Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <Link to={`/tasks/${task._id}`}>{task.title}</Link>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTasks;
