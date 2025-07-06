// src/components/TeamActions.jsx
import api from '../api';

const TeamActions = ({ team, fetchTeamsWithRetry, setEditTeam }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/teams/${id}`);
      fetchTeamsWithRetry?.();
    } catch (error) {
      console.error('❌ Failed to delete team:', error);
    }
  };

  return (
    <div className="flex flex-col min-w-[6rem] bg-white rounded-xl shadow-lg ring-1 ring-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setEditTeam(team);
        }}
        className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800 font-medium text-left"
      >
        ✏️ Edit
      </button>

      <button
        onClick={() => handleDelete(team._id)}
        className="px-4 py-2 whitespace-nowrap text-sm text-red-600 hover:bg-red-50 hover:text-red-800 font-medium text-left"
      >
        🗑️ Delete
      </button>
    </div>
  );
};

export default TeamActions;
