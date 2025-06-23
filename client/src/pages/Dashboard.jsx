import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AddIcon, CompletedTasksIcon, TaskIcon
} from '../components/svg';
import TaskStatusCard from '../components/TaskStatusCard';
import TaskList from '../components/TaskList';
import PageHeader from '../components/PageHeader';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <PageHeader
        redTitle="Dash"
        blackTitle="Board"
        tasks={tasks}
        setTasks={setTasks}
        setIsMenuOpen={setIsMenuOpen}
        filteredTasksList={filteredTasksList}
        setFilteredTasksList={setFilteredTasksList}
      />

      {/* Content */}
      <div className="sm:w-[150vh] w-full sm:absolute sm:right-15 sm:-bottom-4 px-4 mt-5 sm:mt-10 pb-6">
        {!isMenuOpen && (
          <div className="relative z-0 border border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 w-full max-w-7xl mx-auto bg-white transition-all duration-300">
            
            {/* Left Side: Tasks */}
            <div className="order-2 sm:order-1 flex-1 mt-7 sm:mt:0 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto max-h-[70vh] scrollbar-hide">
              <div className="flex items-center justify-between mb-4">
                <div
                  onClick={() => navigate('/tasks')}
                  className="flex items-center gap-x-2 cursor-pointer group"
                >
                  <TaskIcon className="w-4 h-4" />
                  <p className="text-[#FF6767] text-sm font-medium group-hover:underline">Tasks</p>
                </div>
                <button
                  onClick={() => navigate('/addtasks')}
                  className="flex items-center gap-x-2 text-sm text-[#A1A3AB] hover:text-[#FF6767] transition-all"
                >
                  <AddIcon className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </div>

              <TaskList
                tasks={filteredTasksList}
                fetchTasksWithRetry={() => {}}
                statuses={["Pending", "In Progress"]}
              />
            </div>

            {/* Right Side: Status + Completed */}
            <div className="order-1 sm:order-2 w-full sm:w-[22rem] flex flex-col gap-6 mt-6 sm:mt-0">
              <div className="flex justify-center sm:justify-start">
                <TaskStatusCard tasks={tasks} />
              </div>

              <div className="hidden sm:block bg-[#F5F8FF] p-4 rounded-xl border border-[rgba(161,163,171,0.63)] shadow overflow-y-auto max-h-[50vh] scrollbar-hide">
                <div className='flex flex-row gap-x-2'>
                  <CompletedTasksIcon className="w-4 h-4"/>
                  <p className="text-[#F24E1E] font-medium text-sm mb-2">Completed Tasks</p>
                </div>
                <TaskList
                  tasks={tasks}
                  fetchTasksWithRetry={() => {}}
                  statuses={["Completed"]}
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
