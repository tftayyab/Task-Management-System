let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server, {
      cors: {
        origin: ['http://localhost:5173', 'https://tf-task-management-system.netlify.app'],
        credentials: true,
      },
    });

    io.on('connection', (socket) => {
      //console.log('🔌 New connection:', socket.id);

      // ✅ Join personal user room
      socket.on('join_user', (username) => {
        if (username) {
          socket.join(username);
          //console.log(`🔐 Socket ${socket.id} joined user room: ${username}`);
        }
      });

      // ✅ Join multiple team rooms
      socket.on('join_teams', (teamIds = []) => {
        teamIds.forEach((teamId) => {
          socket.join(teamId);
          //console.log(`🔐 Socket ${socket.id} joined team room: ${teamId}`);
        });
      });

      socket.on('disconnect', () => {
        //console.log('❌ Disconnected:', socket.id);
      });
    });

    return io;
  },

  getIO: () => {
    if (!io) throw new Error('Socket.io not initialized!');
    return io;
  },
};
