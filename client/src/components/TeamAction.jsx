import { motion } from 'framer-motion';
import { handleTeamDelete } from '../utils/handleTeams';

const TeamActions = ({
  team,
  fetchTeamsWithRetry,
  setEditTeam,
  selectedTeam,
  setSelectedTeam,
  setNotification,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col min-w-[6rem] bg-white dark:bg-[#1e1e1e] rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden transition-all duration-300 ease-in-out"
    >
      {/* ✏️ Edit */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setEditTeam(team);
        }}
        className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-[#223344] hover:text-blue-800 dark:hover:text-blue-300 font-medium text-left"
      >
        ✏️ Edit
      </button>

      {/* 🗑️ Delete */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleTeamDelete({
            teamId: team._id,
            selectedTeam,
            setSelectedTeam,
            fetchTeamsWithRetry,
            setNotification,
          });
        }}
        className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-[#331f1f] hover:text-red-800 dark:hover:text-red-300 font-medium text-left whitespace-nowrap"
      >
        🗑️ Delete
      </button>
    </motion.div>
  );
};

export default TeamActions;
