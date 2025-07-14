import { useEffect, useState } from 'react';
import { CrossIcon } from '../components/svg';
import {
  handleTeamSubmit,
  handleTeamEditDirect,
  handleMemberChange,
  fetchTeams,
  handleAddToTeam,
} from '../utils/handleTeams';
import { motion } from 'framer-motion';

function TeamForm({ mode = 'add', taskData = null, onClose, fetchTasksWithRetry, setNotification }) {
  const [originalTitle, setOriginalTitle] = useState(document.title);
  const [teamData, setTeamData] = useState({
    teamName: '',
    members: ['', '', '', '', ''],
    _id: null,
  });
  const [userTeams, setUserTeams] = useState([]);
  const [step, setStep] = useState('select');

  useEffect(() => {
    setOriginalTitle(document.title);

    if (mode === 'edit' && taskData) {
      const existingMembers = taskData.shareWith || [];
      const paddedMembers = [...existingMembers, ...Array(5 - existingMembers.length).fill('')];

      setTeamData({
        teamName: taskData.teamName || '',
        members: paddedMembers,
        _id: taskData._id || null,
      });

      document.title = 'Edit Team';
    } else if (mode === 'add') {
      document.title = 'Add Team';
    } else if (mode === 'share') {
      document.title = 'Share Task';
      fetchTeams(setUserTeams);
    }

    return () => {
      document.title = originalTitle;
    };
  }, [mode, taskData]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full sm:w-[90vw] max-w-3xl bg-[#F9F9F9] dark:bg-[#1e1e1e] rounded-xl shadow-2xl p-4 sm:p-8 space-y-6"
      >
        {/* Close */}
        <div
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-transform"
        >
          <CrossIcon className="w-6 h-6 text-black dark:text-white" />
        </div>

        {/* Header */}
        <div className="text-center">
          <p className="text-black dark:text-white font-semibold text-xl sm:text-2xl">
            {mode === 'edit'
              ? 'Edit Team'
              : mode === 'share'
              ? 'Share Task'
              : 'Add New Team'}
          </p>
          <div className="mt-1 mx-auto w-12 sm:w-20 h-1 bg-[#F24E1E] rounded-full" />
        </div>

        {/* Share Mode Select */}
        {mode === 'share' && step === 'select' && (
          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              Choose how you want to share the task:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setStep('create')}
                className="bg-[#FF9090] hover:bg-[#FF6F6F] text-white px-6 py-2 rounded-md text-sm font-medium transition-all"
              >
                ➕ Create New Team
              </button>
              <button
                onClick={() => setStep('list')}
                className="bg-[#F3F3F3] dark:bg-[#2a2a2a] hover:bg-[#ECECEC] dark:hover:bg-[#3a3a3a] border border-[#A1A3AB] text-black dark:text-white px-6 py-2 rounded-md text-sm font-medium transition-all"
              >
                📌 Add to Existing Team
              </button>
            </div>
          </div>
        )}

        {/* Team List */}
        {mode === 'share' && step === 'list' && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-black dark:text-white text-center">
              Select a team to share this task with:
            </p>
            <ul className="space-y-3 max-h-[40vh] overflow-y-auto pr-1 scrollbar-hide">
              {userTeams.length === 0 ? (
                <p className="text-gray-500 text-center dark:text-gray-400">No teams available</p>
              ) : (
                userTeams.map((team) => (
                  <li
                    key={team._id}
                    onClick={() =>
                      handleAddToTeam({ team, taskData, fetchTasksWithRetry, onClose, setNotification })
                    }
                    className="cursor-pointer px-4 py-3 rounded-md bg-white dark:bg-[#2a2a2a] border border-[#A1A3AB]
                               hover:border-[#FFAFAF] hover:shadow-md hover:bg-gray-50 dark:hover:bg-[#3a3a3a]
                               transition-all"
                  >
                    <p className="text-sm font-medium text-black dark:text-white">{team.teamName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Shared with: {team.shareWith.join(', ') || 'None'}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {/* Form */}
        {(mode === 'add' || mode === 'edit' || step === 'create') && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-1">Team Name</label>
              <input
                type="text"
                placeholder="Enter team name"
                value={teamData.teamName}
                onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })}
                className="w-full border border-[#A1A3AB] rounded-md px-3 py-2 text-sm bg-white dark:bg-[#2a2a2a] text-black dark:text-white
                           hover:border-[#FFAFAF] focus:border-[#F24E1E]
                           focus:outline-none focus:ring-1 focus:ring-[#F24E1E]
                           transition-all"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-black dark:text-white">Team Members (Max 5)</p>
              {teamData.members.map((member, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Member ${idx + 1}`}
                  value={member}
                  onChange={(e) =>
                    handleMemberChange(idx, e.target.value, teamData, setTeamData)
                  }
                  className="w-full border border-[#A1A3AB] rounded-md px-3 py-2 text-sm bg-white dark:bg-[#2a2a2a] text-black dark:text-white
                             hover:border-[#FFAFAF] focus:border-[#F24E1E]
                             focus:outline-none focus:ring-1 focus:ring-[#F24E1E]
                             transition-all"
                />
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (mode === 'edit') {
                    handleTeamEditDirect({ teamData, fetchTasksWithRetry, onClose, setNotification });
                  } else {
                    handleTeamSubmit({ teamData, fetchTasksWithRetry, onClose, taskData, setNotification });
                  }
                }}
                disabled={!teamData.teamName}
                className={`bg-[#FF9090] hover:bg-[#FF6F6F] hover:scale-[1.03] text-white px-6 py-2 rounded-md text-sm font-medium shadow transition-all duration-300
                  ${!teamData.teamName && 'opacity-50 cursor-not-allowed'}`}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default TeamForm;
