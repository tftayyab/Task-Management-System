import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AddIcon, CompletedTasksIcon, TaskIcon
} from '../components/svg';
import TaskStatusCard from '../components/TaskStatusCard';
import TaskList from '../components/TaskList';
import PageHeader from '../components/PageHeader';
import AddTasks from './AddTasks';
import Edit from './Edit'; // or wherever you have it
import api from '../api';


function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null); // to hold the task being edited
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard";
    fetchTasksWithRetry();
  }, []);

  const fetchTasksWithRetry = async () => {
    try {
      const username = localStorage.getItem("username");
      const res = await api.get(`/tasks?username=${username}`);
      setTasks(res.data);
      setFilteredTasksList(res.data); // ✅ update both
    } catch (err) {
      console.error("❌ Failed to fetch tasks:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      
      {/* ✅ Add Task Modal */}
      {showAddModal && (
        <AddTasks
          onClose={() => setShowAddModal(false)}
          fetchTasksWithRetry={fetchTasksWithRetry}
        />
      )}
      {editTask && (
        <Edit
          taskData={editTask}
          onClose={() => setEditTask(null)} // close logic
          fetchTasksWithRetry={fetchTasksWithRetry}
        />
      )}

      {/* ✅ Header */}
      <PageHeader
        redTitle="Dash"
        blackTitle="Board"
        tasks={tasks}
        setTasks={setTasks}
        filteredTasksList={filteredTasksList}
        setFilteredTasksList={setFilteredTasksList}
        setIsMenuOpen={setIsMenuOpen}
        searchTerm={searchTerm}               // ✅
        setSearchTerm={setSearchTerm}  
      />

      {/* ✅ Main Content */}
      <div className="sm:w-[150vh] w-full sm:top-25 sm:absolute sm:right-15 sm:-bottom-4 px-4 mt-5 sm:mt-10 pb-6">
        {!isMenuOpen && (
          <div className="relative z-0 border h-[79vh] border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 w-full max-w-7xl mx-auto bg-white transition-all duration-300">

            {/* 🔶 Left: Task List */}
            <div className="order-2 sm:order-1 sm:h-[73vh] flex-1 mt-7 sm:mt-0 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto max-h-[75vh] scrollbar-hide">
              <div className="flex items-center justify-between mb-4">
                <div
                  onClick={() => navigate('/mytasks')}
                  className="flex items-center gap-x-2 cursor-pointer group"
                >
                  <TaskIcon className="w-4 h-4" />
                  <p className="text-[#FF6767] text-sm font-medium group-hover:underline">Tasks</p>
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-x-2 text-sm text-[#A1A3AB] hover:text-[#FF6767] transition-all"
                >
                  <AddIcon className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </div>

              <TaskList
                tasks={filteredTasksList}
                fetchTasksWithRetry={fetchTasksWithRetry}
                statuses={["Pending", "In Progress"]}
                onTaskClick={(id) => setSelectedTaskId(id)}
                setEditTask={setEditTask} // ✅ new prop
                searchTerm={searchTerm} 
              />
            </div>

            {/* 🔷 Right: Status + Completed */}
            <div className="order-1 sm:order-2 w-full sm:w-[22rem] flex flex-col gap-6 mt-6 sm:mt-0">
              <div className="flex justify-center sm:justify-start">
                <TaskStatusCard tasks={tasks} />
              </div>

              <div className="hidden sm:block bg-[#F5F8FF] p-4 rounded-xl border border-[rgba(161,163,171,0.63)] shadow overflow-y-auto max-h-[50vh] scrollbar-hide">
                <div className='flex flex-row gap-x-2'>
                  <CompletedTasksIcon className="w-4 h-4" />
                  <p className="text-[#F24E1E] font-medium text-sm mb-2">Completed Tasks</p>
                </div>
                <TaskList
                  tasks={tasks}
                  fetchTasksWithRetry={fetchTasksWithRetry}
                  statuses={["Completed"]}
                  onTaskClick={(id) => setSelectedTaskId(id)}
                  setEditTask={setEditTask} // ✅ new prop
                />
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
