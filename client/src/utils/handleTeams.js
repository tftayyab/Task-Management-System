import api from '../api';

// 🧩 Handle team creation
export const handleTeamSubmit = async ({ teamData, fetchTasksWithRetry, onClose }) => {
  try {
    const payload = {
      teamName: teamData.teamName,
      usernames: teamData.members.filter(Boolean),
    };

    await api.post('/teams', payload);

    if (fetchTasksWithRetry) fetchTasksWithRetry();
    if (onClose) onClose();
  } catch (error) {
    console.error("❌ Team submit failed:", error);
  }
};

// ♻️ Handle team update
export const handleTeamUpdate = async ({ teamData, taskData, fetchTasksWithRetry, onClose }) => {
  try {
    const payload = {
      teamName: teamData.teamName,
      usernames: teamData.members.filter(Boolean),
    };

    // ✅ Use taskData._id (the task being shared)
    await api.put(`/tasks/${taskData._id}/share`, payload);

    if (fetchTasksWithRetry) fetchTasksWithRetry();
    if (onClose) onClose();
  } catch (error) {
    console.error("❌ Team update failed:", error);
  }
};

