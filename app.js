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
let connectedPeersStrangers = [];

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
    } else {
      io.to(socket.id).emit("pre-offer-answer", {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      });
    }
  });

  socket.on("pre-offer-answer", (data) => {
    const { callSocketId } = data;

    const connectedPeer = connectedPeers.find(
      (peerId) => peerId === callSocketId
    );

    if (connectedPeer) {
      io.to(callSocketId).emit("pre-offer-answer", data);
    }
  });

  socket.on("webRTC-signaling", (data) => {
    const { connectedUserSocketId } = data;

    const connectedPeer = connectedPeers.find(
      (peerId) => peerId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("webRTC-signaling", data);
    }
  });

  socket.on("user-hanged-up", (data) => {
    const { connectedUserSocketId } = data;
    const connectedPeer = connectedPeers.find(
      (peerId) => peerId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("user-hanged-up");
    }
  });

  socket.on("stranger-connection-status", (data) => {
    const { status } = data;
    if (status) {
      connectedPeersStrangers.push(socket.id);
    } else {
      const newConnectedPeersStrangers = connectedPeersStrangers.filter(
        (peerId) => peerId !== socket.id
      );

      connectedPeersStrangers = newConnectedPeersStrangers;
    }
  });

  socket.on("get-stranger-socket-id", () => {
    let randomStrangerSocketId;
    const filteredConnectedPeersStrangers = connectedPeersStrangers.filter(
      (peerId) => peerId !== socket.id
    );

    if (filteredConnectedPeersStrangers.length > 0) {
      randomStrangerSocketId =
        filteredConnectedPeersStrangers[
          Math.floor(Math.random() * filteredConnectedPeersStrangers.length)
        ];
    } else {
      randomStrangerSocketId = null;
    }

    const data = {
      randomStrangerSocketId,
    };

    io.to(socket.id).emit("stranger-socket-id", data);
  });

  socket.on("disconnect", () => {
    connectedPeers = connectedPeers.filter(
      (socketId) => socketId !== socket.id
    );

    const newConnectedPeersStrangers = connectedPeersStrangers.filter(
      (peerId) => peerId !== socket.id
    );

    connectedPeersStrangers = newConnectedPeersStrangers;
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
