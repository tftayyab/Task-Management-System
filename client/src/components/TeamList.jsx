// src/components/TeamList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleIcon, TeamIcon, AddIcon, OptionIcon } from './svg';
import TeamActions from './TeamAction';
import useIsMobile from '../utils/useScreenSize';

function TeamList({ teams = [], onTeamClick, onAddTeamClick, fetchTeamsWithRetry, setEditTeam }) {
  const [openActionId, setOpenActionId] = useState(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const strokeColors = ['#F21E1E', '#FFB347', '#3ABEFF', '#4CAF50'];

  // Close dropdown on outside click
  useEffect(() => {
    const close = () => setOpenActionId(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {/* 🔺 Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          onClick={() => navigate('/collaborate')}
          className="flex items-center gap-x-2 cursor-pointer group"
        >
          <TeamIcon className="w-4 h-4" />
          <p className="text-[#FF6767] text-sm font-medium group-hover:underline">Teams</p>
        </div>

        <button
          onClick={() => onAddTeamClick?.()}
          className="flex items-center gap-x-2 text-sm text-[#A1A3AB] hover:text-[#FF6767] transition-all"
        >
          <AddIcon className="w-4 h-4" />
          <span>Add Team</span>
        </button>
      </div>

      {/* 🧾 Team List */}
      {teams.length === 0 ? (
        <p className="text-gray-400 text-lg font-inter text-center mt-10">No Teams Found</p>
      ) : (
        <ul className="flex flex-col gap-4 w-full h-full overflow-y-auto pr-1 scrollbar-hide">
          {teams.map((team, index) => {
            const stroke = strokeColors[index % strokeColors.length];
            return (
              <li
                key={team._id}
                onClick={() => {
                  if (!isMobile && onTeamClick) onTeamClick(team._id);
                }}
                className="cursor-pointer group p-4 rounded-xl border border-[#A1A3AB] bg-white shadow transition-all duration-200 hover:shadow-lg hover:scale-[1.001] relative"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CircleIcon className="flex-shrink-0 mt-1 w-4 h-4" stroke={stroke} />
                    <p className="text-black font-inter text-base font-semibold truncate">
                      {team.teamName || 'Unnamed Team'}
                    </p>
                  </div>

                  {/* ⋮ Actions */}
                  <div className="relative hidden sm:block">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenActionId(prev => (prev === team._id ? null : team._id));
                      }}
                      className="hover:scale-110 transition-transform p-2"
                    >
                      <OptionIcon />
                    </button>

                    {openActionId === team._id && (
                      <div className="absolute z-50 right-0 mt-2">
                        <TeamActions
                          team={team}
                          fetchTeamsWithRetry={fetchTeamsWithRetry}
                          setEditTeam={setEditTeam}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 text-sm text-[#555]">
                  <p><span className="font-medium text-black">Owner:</span> {team.owner}</p>
                  <p>
                    <span className="font-medium text-black">Shared With:</span>{' '}
                    {team.shareWith?.length > 0 ? team.shareWith.join(', ') : 'No one yet'}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TeamList;
