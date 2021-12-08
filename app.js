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
    } else {
      io.to(socket.id).emit("pre-offer-answer", {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      });
    }
  });

  socket.on("pre-offer-answer", (data) => {
    console.log("pre offer came");
    console.log(data);

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
