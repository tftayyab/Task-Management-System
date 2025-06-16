import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div>
      <Helmet>
        <title>Task Manager</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet" />
      </Helmet>

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
