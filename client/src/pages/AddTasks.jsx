import TaskForm from '../components/TaskForm';
function AddTasks(props) {
  return <TaskForm mode="add" {...props} />;
}
export default AddTasks;
