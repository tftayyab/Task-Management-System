import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/tasks/${id}`)// send a GET request
      .then(res => res.json())
      .then(data => setTask(data))
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

export default TaskDetails;
