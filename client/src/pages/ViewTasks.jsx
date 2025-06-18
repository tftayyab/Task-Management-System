import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewTasks() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/task/${id}`) // Make sure this matches your backend route
      .then(res => setTask(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
}

export default ViewTasks;
