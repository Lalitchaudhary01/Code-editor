const express = require("express");
const app = express();

const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./src/Actions");
const server = http.createServer(app);

const io = new Server(server);

const userSocketMap = {};
function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`LIstening on port ${PORT}`));
