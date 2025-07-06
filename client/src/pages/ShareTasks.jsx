// ShareTasks.jsx
import TeamForm from '../components/TeamForm';

function ShareTasks({ taskData, onClose, fetchTasksWithRetry }) {
  return (
    <TeamForm
      mode="share"
      taskData={taskData}
      onClose={onClose}
      fetchTasksWithRetry={fetchTasksWithRetry}
    />
  );
}

export default ShareTasks;
