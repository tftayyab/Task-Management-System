// ✅ useSocketNotifications.js
import { useEffect } from 'react';
import socket from '../utils/socket'; // NOT `import  socket` (no extra space)

function useSocketNotifications(setNotification) {
  useEffect(() => {
    const handleTeamAdded = (data) => setNotification(data.message);
    const handleTeamUpdated = (data) => setNotification(data.message);
    const handleTaskCreated = (data) => setNotification(data.message);

    socket.on('team_added', handleTeamAdded);
    socket.on('team_updated', handleTeamUpdated);
    socket.on('task_created', handleTaskCreated);

    return () => {
      socket.off('team_added', handleTeamAdded);
      socket.off('team_updated', handleTeamUpdated);
      socket.off('task_created', handleTaskCreated);
    };
  }, [setNotification]);
}

export default useSocketNotifications;
