import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AddIcon, CompletedTasksIcon, TaskIcon
} from '../components/svg';
import TaskStatusCard from '../components/TaskStatusCard';
import TaskList from '../components/TaskList';
import PageHeader from '../components/PageHeader';
import AddTasks from './AddTasks';
import Edit from './EditTasks';
import Menu from '../components/Menu';
import api from '../api';
import useIsMobile from '../utils/useScreenSize';
import useAuthToken from '../utils/useAuthToken';
import ShareTasks from './ShareTasks';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [shareTask, setShareTask] = useState(null); // ✅ NEW
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useAuthToken();

  useEffect(() => {
    document.title = "Dashboard";
    fetchTasksWithRetry();
  }, []);

  const fetchTasksWithRetry = async () => {
    try {
      const username = localStorage.getItem("username");
      const res = await api.get(`/tasks?username=${username}`);
      setTasks(res.data);
      setFilteredTasksList(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch tasks:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen h-screen bg-white flex flex-col overflow-hidden">

      {/* Top Header */}
      <div className="w-full z-40">
        <PageHeader
          redTitle="Dash"
          blackTitle="Board"
          tasks={tasks}
          setTasks={setTasks}
          filteredTasksList={filteredTasksList}
          setFilteredTasksList={setFilteredTasksList}
          setIsMenuOpen={setIsMenuOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Row: Menu + Main Content Box */}
      <div className="flex flex-row mt-[2rem] gap-x-20 sm:mt-[1rem]">

        {/* Menu */}
        <div className="hidden sm:block h-screen w-[16rem] z-50">
          <Menu />
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex justify-center px-4 pb-6">
          {!isMenuOpen && (
            <div className="relative z-0 border sm:h-[76vh] border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 sm:w-[150vh] w-[40vh] bg-white transition-all duration-300">

              {/* Task List */}
              <div className="order-2 sm:order-1 sm:h-full flex-1 mt-7 sm:mt-0 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto max-h-[75vh] scrollbar-hide">
                <TaskList
                  tasks={filteredTasksList}
                  mode="dashboard"
                  setShareTask={setShareTask} 
                  fetchTasksWithRetry={fetchTasksWithRetry}
                  statuses={["Pending", "In Progress"]}
                  onAddTaskClick={() => setShowAddModal(true)}
                  onTaskClick={(id) => {
                    if (isMobile) {
                      const taskToEdit = tasks.find((task) => task._id === id);
                      if (taskToEdit) {
                        setEditTask(taskToEdit);
                      }
                    } else {
                      navigate(`/mytasks?taskId=${id}`);
                    }
                  }}
                  setEditTask={setEditTask}
                  searchTerm={searchTerm}
                />
              </div>

              {/* Completed Tasks */}
              <div className="order-1 sm:order-2 w-full sm:w-[22rem] flex flex-col gap-6 mt-6 sm:mt-0">
                <div className="flex justify-center sm:justify-start">
                  <TaskStatusCard tasks={tasks} />
                </div>

                <div className="hidden sm:block h-[40vh] bg-[#F5F8FF] p-4 rounded-xl border border-[rgba(161,163,171,0.63)] shadow overflow-y-auto max-h-[50vh] scrollbar-hide">
                  <div className='flex flex-row gap-x-2'>
                    <CompletedTasksIcon className="w-4 h-4" />
                    <p className="text-[#F24E1E] font-medium text-sm mb-2">Completed Tasks</p>
                  </div>

                  <TaskList
                    tasks={tasks}
                    fetchTasksWithRetry={fetchTasksWithRetry}
                    statuses={["Completed"]}
                    setShareTask={setShareTask} 
                    mode="dashboard"
                    onTaskClick={(id) => {
                      if (isMobile) {
                        const taskToEdit = tasks.find((task) => task._id === id);
                        if (taskToEdit) {
                          setEditTask(taskToEdit);
                        }
                      } else {
                        navigate(`/mytasks?taskId=${id}`);
                      }
                    }}
                    setEditTask={setEditTask}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddTasks
          onClose={() => setShowAddModal(false)}
          fetchTasksWithRetry={fetchTasksWithRetry}
        />
      )}

      {editTask && (
        <Edit
          taskData={editTask}
          onClose={() => setEditTask(null)}
          fetchTasksWithRetry={fetchTasksWithRetry}
        />
      )}

      {/* ✅ Share Task Modal */}
      {shareTask && (
        <ShareTasks
          taskData={shareTask}
          onClose={() => setShareTask(null)}
          fetchTasksWithRetry={fetchTasksWithRetry}
        />
      )}
    </div>
  );
}

export default Dashboard;
