import { motion } from 'framer-motion';
import { handleTeamDelete } from '../utils/handleTeams';

const TeamActions = ({
  team,
  fetchTeamsWithRetry,
  setEditTeam,
  selectedTeam,
  setSelectedTeam,
  setNotification, // ✅ added
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col min-w-[6rem] bg-white rounded-xl shadow-lg ring-1 ring-gray-200 overflow-hidden transition-all duration-300 ease-in-out"
    >
      {/* ✏️ Edit */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setEditTeam(team);
        }}
        className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800 font-medium text-left"
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
            setNotification, // ✅ pass it
          });
        }}
        className="px-4 py-2 whitespace-nowrap text-sm text-red-600 hover:bg-red-50 hover:text-red-800 font-medium text-left"
      >
        🗑️ Delete
      </button>
    </motion.div>
  );
};

export default TeamActions;
