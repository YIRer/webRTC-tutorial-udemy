const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let connectedPeers = [];

io.on("connection", (socket) => {
  connectedPeers.push(socket.id);

  socket.on("pre-offer", (data) => {
    const { callType, calleePersonalCode } = data;

    const connectedPeer = connectedPeers.find(
      (peerID) => peerID.toString() === calleePersonalCode
    );

    if (connectedPeer) {
      const data = {
        calleePersonalCode: socket.id,
        callType,
      };

      io.to(calleePersonalCode).emit("pre-offer", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    connectedPeers = connectedPeers.filter(
      (socketId) => socketId !== socket.id
    );
    console.log(connectedPeers);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
