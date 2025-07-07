import { useEffect, useState } from 'react';
import { CrossIcon } from '../components/svg';
import { handleTeamSubmit, handleTeamUpdate, handleTeamEditDirect } from '../utils/handleTeams';
import api from '../api';
import { motion } from 'framer-motion';

function TeamForm({ mode = 'add', taskData = null, onClose, fetchTasksWithRetry }) {
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
      fetchTeams();
    }

    return () => {
      document.title = originalTitle;
    };
  }, [mode, taskData]);

  const fetchTeams = async () => {
    try {
      const res = await api.get('/tasks/shared');
      setUserTeams(res.data.teams || []);
    } catch (err) {
      console.error('Failed to fetch teams:', err);
    }
  };

  const handleMemberChange = (idx, value) => {
    const updatedMembers = [...teamData.members];
    updatedMembers[idx] = value;
    setTeamData({ ...teamData, members: updatedMembers });
  };

  const handleAddToTeam = async (team) => {
    try {
      const payload = {
        teamName: team.teamName,
        usernames: team.shareWith,
      };

      await api.put(`/task/${taskData._id}/share`, payload);

      if (fetchTasksWithRetry) fetchTasksWithRetry();
      if (onClose) onClose();
    } catch (err) {
      console.error('❌ Failed to share task with team:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full sm:w-[90vw] max-w-3xl bg-[#F9F9F9] rounded-xl shadow-2xl p-4 sm:p-8 space-y-6"
      >
        {/* Close */}
        <div onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
          <CrossIcon className="w-6 h-6 hover:scale-110 transition-transform" />
        </div>

        {/* Header */}
        <div className="text-center">
          <p className="text-black font-semibold text-xl sm:text-2xl">
            {mode === 'edit'
              ? 'Edit Team'
              : mode === 'share'
              ? 'Share Task'
              : 'Add New Team'}
          </p>
          <div className="mt-1 mx-auto w-12 sm:w-20 h-1 bg-[#F24E1E] rounded-full" />
        </div>

        {/* Step: Share Mode Select */}
        {mode === 'share' && step === 'select' && (
          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-700 font-medium">Choose how you want to share the task:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setStep('create')}
                className="bg-[#FF9090] hover:bg-[#FF6F6F] text-white px-6 py-2 rounded-md text-sm font-medium"
              >
                ➕ Create New Team
              </button>
              <button
                onClick={() => setStep('list')}
                className="bg-[#F3F3F3] hover:bg-[#ECECEC] border border-[#A1A3AB] text-black px-6 py-2 rounded-md text-sm font-medium"
              >
                📌 Add to Existing Team
              </button>
            </div>
          </div>
        )}

        {/* Step: Share Mode Team List */}
        {mode === 'share' && step === 'list' && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-black text-center">Select a team to share this task with:</p>
            <ul className="space-y-3 max-h-[40vh] overflow-y-auto pr-1 scrollbar-hide">
              {userTeams.length === 0 ? (
                <p className="text-gray-500 text-center">No teams available</p>
              ) : (
                userTeams.map((team) => (
                  <li
                    key={team._id}
                    onClick={() => handleAddToTeam(team)}
                    className="cursor-pointer px-4 py-3 rounded-md bg-white border border-[#A1A3AB] hover:shadow hover:bg-gray-50 transition-all"
                  >
                    <p className="text-sm font-medium text-black">{team.teamName}</p>
                    <p className="text-xs text-gray-500">
                      Shared with: {team.shareWith.join(', ') || 'None'}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {/* Add/Edit/Create Form */}
        {(mode === 'add' || mode === 'edit' || step === 'create') && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Team Name</label>
              <input
                type="text"
                placeholder="Enter team name"
                value={teamData.teamName}
                onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })}
                className="w-full border border-[#A1A3AB] rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-black">Team Members (Max 5)</p>
              {teamData.members.map((member, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Member ${idx + 1}`}
                  value={member}
                  onChange={(e) => handleMemberChange(idx, e.target.value)}
                  className="w-full border border-[#A1A3AB] rounded-md px-3 py-2 text-sm"
                />
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (mode === 'edit') {
                    handleTeamEditDirect({ teamData, fetchTasksWithRetry, onClose });
                  } else {
                    handleTeamSubmit({ teamData, fetchTasksWithRetry, onClose, taskData });
                  }
                }}
                disabled={!teamData.teamName}
                className="bg-[#FF9090] hover:bg-[#FF6F6F] text-white px-6 py-2 rounded-md text-sm font-medium shadow transition-all"
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
