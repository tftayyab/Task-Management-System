import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Menu from '../components/Menu';
import TeamList from '../components/TeamList';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TeamForm from '../components/TeamForm';
import api from '../api';
import useAuthToken from '../utils/useAuthToken';
import ShareTasks from './ShareTasks';

function Collaborate() {
  const location = useLocation();
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [shareTask, setShareTask] = useState(null); // ✅ NEW

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [editTeam, setEditTeam] = useState(null);

  useAuthToken();

  useEffect(() => {
    fetchSharedData();
  }, []);

  const fetchSharedData = async () => {
    try {
      const res = await api.get('/tasks/shared');
      setTeams(res.data.teams || []);
      setTasks(res.data.tasks || []);

      if (res.data.teams && res.data.teams.length > 0) {
        setSelectedTeam(res.data.teams[0]);
      }
    } catch (err) {
      console.error("❌ Failed to load shared data:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

const filteredTasks = selectedTeam
  ? tasks.filter(task => task.teamId?.toString() === selectedTeam._id)
  : [];

  return (
    <div className="min-h-screen h-screen bg-white flex flex-col overflow-hidden">
      {/* 🔷 Header */}
      <div className="w-full z-40">
        <PageHeader
          redTitle="Colla"
          blackTitle="borate"
          tasks={tasks}
          setTasks={setTasks}
          setFilteredTasksList={() => {}}
          setIsMenuOpen={setIsMenuOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* 🔶 Layout */}
      <div className="flex flex-row mt-[2rem] gap-x-20 sm:mt-[1rem]">
        {/* Menu Sidebar */}
        <div className="hidden sm:block h-screen w-[16rem] z-50">
          <Menu />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex justify-center px-4 pb-6">
          {!isMenuOpen && (
            <div className="relative z-0 border sm:h-[76vh] border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row sm:gap-6 sm:w-[150vh] w-[40vh] bg-white transition-all duration-300">
              
              {/* 🔹 Team List */}
              <div className="order-1 sm:h-full w-full sm:w-1/2 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto scrollbar-hide">
                <TeamList
                  teams={teams}
                  onTeamClick={(teamId) => {
                    const team = teams.find((t) => t._id === teamId);
                    setSelectedTeam(team);
                  }}
                  onAddTeamClick={() => setShowTeamForm(true)}
                  fetchTeamsWithRetry={fetchSharedData}
                  setEditTeam={setEditTeam}
                />
              </div>

              {/* 🔸 Task List */}
              <div className="order-2 sm:h-full w-full sm:w-1/2 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto scrollbar-hide">
                {selectedTeam ? (
                  <TaskList
                    tasks={filteredTasks}
                    statuses={["Pending", "In Progress", "Completed"]}
                    setEditTask={setEditTask}
                    fetchTasksWithRetry={fetchSharedData}
                    setShareTask={setShareTask}
                    onTaskClick={() => {}}
                    onAddTaskClick={() => setShowTaskForm(true)}
                    searchTerm={searchTerm}
                  />
                ) : (
                  <p className="text-gray-400 text-lg font-inter text-center mt-20">
                    No team selected
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Modals */}
      {/* ✅ Add Task */}
      {showTaskForm && (
        <TaskForm
          mode="add"
          team={selectedTeam} // ✅ Pass the team
          onClose={() => setShowTaskForm(false)}
          fetchTasksWithRetry={fetchSharedData}
        />
      )}
      {/* ✅ Edit Task */}
      {editTask && (
        <TaskForm
          mode="edit"
          taskData={editTask}
          team={selectedTeam} // ✅ Pass for consistency (optional in edit)
          onClose={() => setEditTask(null)}
          fetchTasksWithRetry={fetchSharedData}
        />
      )}

      {/* ✅ Add Team */}
      {showTeamForm && (
        <TeamForm
          mode="add"
          onClose={() => setShowTeamForm(false)}
          fetchTasksWithRetry={() => {
            fetchSharedData(); // ✅ Refresh teams and tasks
          }}
        />
      )}

      {/* ✅ Edit Team */}
      {editTeam && (
        <TeamForm
          mode="edit"
          taskData={editTeam}
          onClose={() => setEditTeam(null)}
          fetchTasksWithRetry={() => {
            fetchSharedData(); // ✅ Refresh after edit
          }}
        />
      )}
      {shareTask && (
        <ShareTasks
          taskData={shareTask}
          onClose={() => setShareTask(null)}
          fetchTasksWithRetry={fetchSharedData}
        />
      )}
    </div>
  );
}

export default Collaborate;
