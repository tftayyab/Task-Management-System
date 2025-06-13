import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <title>Task Manager</title>

      <h1>Welcome to Task Manager</h1>
      <nav>
        <ul>
          <li><Link to="/tasks">View All Tasks</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
