import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import TeamList from '../components/TeamList';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TeamForm from '../components/TeamForm';
import ShareTasks from './ShareTasks';
import api from '../api';
import useAuthToken from '../utils/useAuthToken';
import { motion } from 'framer-motion';

function Collaborate() {
  const {
    searchTerm,
    setSearchTerm,
    isMenuOpen,
    setIsMenuOpen,
    setNotification, // ✅ get notification setter
  } = useOutletContext();

  const location = useLocation();
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareTask, setShareTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [editTeam, setEditTeam] = useState(null);

  useAuthToken();

  useEffect(() => {
    fetchSharedData();
  }, []);

  const fetchSharedData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tasks/shared');
      const updatedTeams = res.data.teams || [];
      setTeams(updatedTeams);
      setTasks(res.data.tasks || []);

      if (
        selectedTeam &&
        updatedTeams.some((team) => team._id === selectedTeam._id)
      ) {
        setSelectedTeam(updatedTeams.find((team) => team._id === selectedTeam._id));
      } else if (updatedTeams.length > 0) {
        setSelectedTeam(updatedTeams[0]);
      } else {
        setSelectedTeam(null);
      }
    } catch (err) {
      console.error("❌ Failed to load shared data:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = selectedTeam
    ? tasks.filter(task =>
        Array.isArray(task.teamIds) &&
        task.teamIds.some(id => id.toString() === selectedTeam._id)
      )
    : [];

  return (
    <motion.div
      className="min-h-screen h-screen bg-white flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Layout */}
      <motion.div
        className="flex flex-row mt-[2rem] gap-x-20 sm:mt-[1rem]"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex-1 flex justify-center sm:justify-end sm:mr-5 px-4 pb-6">
          {!isMenuOpen && (
            <div className="relative z-0 border h-[75vh] sm:h-[76vh] border-[rgba(161,163,171,0.63)] shadow-lg rounded-2xl p-4 sm:flex flex-col gap-y-5 sm:flex-row sm:gap-6 sm:w-[150vh] w-[40vh] bg-white transition-all duration-300">
              
              {/* 🔹 Team List */}
              <div className="order-1 sm:h-full w-full h-full sm:w-1/2 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto scrollbar-hide">
                <TeamList
                  teams={teams}
                  onTeamClick={(teamId) => {
                    const team = teams.find((t) => t._id === teamId);
                    setSelectedTeam(team);
                  }}
                  onAddTeamClick={() => {
                    setShowTeamForm(true);
                  }}
                  fetchTeamsWithRetry={fetchSharedData}
                  setEditTeam={(team) => {
                    setEditTeam(team);
                  }}
                  selectedTeam={selectedTeam}
                  setSelectedTeam={setSelectedTeam}
                  loading={loading}
                />
              </div>

              {/* 🔸 Task List */}
              <div className="order-2 hidden sm:block sm:h-full h-full w-full sm:w-1/2 bg-[#F5F8FF] rounded-xl p-6 overflow-y-auto scrollbar-hide">
                <TaskList
                  tasks={filteredTasks}
                  statuses={["Pending", "In Progress", "Completed"]}
                  setEditTask={(task) => {
                    setEditTask(task);
                  }}
                  fetchTasksWithRetry={fetchSharedData}
                  setShareTask={(task) => {
                    setShareTask(task);
                  }}
                  onTaskClick={(taskId) => navigate(`/viewtask/${taskId}`)}
                  onAddTaskClick={() => {
                    setShowTaskForm(true);
                  }}
                  searchTerm={searchTerm}
                  loading={loading}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ✅ Modals */}
      {showTaskForm && (
        <TaskForm
          mode="add"
          team={selectedTeam}
          onClose={() => setShowTaskForm(false)}
          fetchTasksWithRetry={() => {
            fetchSharedData();
            setNotification("Task added to team");
          }}
        />
      )}

      {editTask && (
        <TaskForm
          mode="edit"
          taskData={editTask}
          team={selectedTeam}
          onClose={() => setEditTask(null)}
          fetchTasksWithRetry={() => {
            fetchSharedData();
            setNotification("Task updated");
          }}
        />
      )}

      {showTeamForm && (
        <TeamForm
          mode="add"
          onClose={() => setShowTeamForm(false)}
          fetchTasksWithRetry={() => {
            fetchSharedData();
            setNotification("Team created successfully");
          }}
        />
      )}

      {editTeam && (
        <TeamForm
          mode="edit"
          taskData={editTeam}
          onClose={() => setEditTeam(null)}
          fetchTasksWithRetry={() => {
            fetchSharedData();
            setNotification("Team updated");
          }}
        />
      )}

      {shareTask && (
        <ShareTasks
          taskData={shareTask}
          onClose={() => setShareTask(null)}
          fetchTasksWithRetry={() => {
            fetchSharedData();
            setNotification("Task shared with team");
          }}
        />
      )}
    </motion.div>
  );
}

export default Collaborate;
