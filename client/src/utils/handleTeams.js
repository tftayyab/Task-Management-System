import api from '../api';

// 🧩 Handle team creation
export const handleTeamSubmit = async ({ teamData, fetchTasksWithRetry, onClose, taskData = null }) => {
  try {
    const payload = {
      teamName: teamData.teamName,
      usernames: teamData.members.filter(Boolean),
    };

    // 🧩 Step 1: Create the team
    await api.post('/teams', payload);

    // 🧩 Step 2: If a task is being shared, share it to this new team
    if (taskData) {
      await api.put(`/task/${taskData._id}/share`, payload);
    }

    // ✅ Refresh data and close modal
    if (fetchTasksWithRetry) fetchTasksWithRetry();
    if (onClose) onClose();
  } catch (error) {
    console.error("❌ Team submit (with share) failed:", error);
  }
};

// ♻️ Handle team update (share task with team)
export const handleTeamUpdate = async ({ teamData, taskData, fetchTasksWithRetry, onClose }) => {
  try {
    const payload = {
      teamName: teamData.teamName,
      usernames: teamData.members.filter(Boolean),
      teamId: teamData._id, // ✅ Add this line (must be present in the team object)
    };

    await api.put(`/task/${taskData._id}/share`, payload);

    if (fetchTasksWithRetry) fetchTasksWithRetry();
    if (onClose) onClose();
  } catch (error) {
    console.error("❌ Team update failed:", error);
  }
};

// ✏️ Real team edit (not task sharing)
export const handleTeamEditDirect = async ({ teamData, fetchTasksWithRetry, onClose }) => {
  try {
    const payload = {
      teamName: teamData.teamName,
      usernames: teamData.members.filter(Boolean),
    };

    await api.put(`/teams/${teamData._id}`, payload); // ✅ hit /teams/:id

    if (fetchTasksWithRetry) fetchTasksWithRetry();
    if (onClose) onClose();
  } catch (err) {
    console.error("❌ Failed to edit team:", err);
  }
};

