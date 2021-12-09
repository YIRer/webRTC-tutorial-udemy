import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";
import * as strangerUtils from "./strangerUitls.js";

let socketIO = null;

export const registerSocketEvents = (socket) => {
  socket.on("connect", () => {
    //console.log("succesfully connected to wss server");
    store.setSocketId(socket.id);

    socketIO = socket;
    ui.updatePersonalCode(socket.id);
  });

  socket.on("pre-offer", (data) => {
    webRTCHandler.handlePreOffer(data);
  });

  socket.on("pre-offer-answer", (data) => {
    //console.log('sendPreOfferAnswer', data)
    webRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on("stranger-socket-id", (data) => {
    strangerUtils.connectWithStranger(data);
  });

  socket.on("webRTC-signaling", (data) => {
    switch (data.type) {
      case constants.webRTCSignaling.OFFER:
        webRTCHandler.handleWebRTCOffer(data);
        break;

      case constants.webRTCSignaling.ANSWER:
        webRTCHandler.hanldeWebRTCAnswer(data);
        break;
      case constants.webRTCSignaling.ICE_CANDIDATE:
        webRTCHandler.handleWebRTCCandidate(data);
        break;
      default:
        break;
    }
  });

  socket.on("user-hanged-up", () => {
    webRTCHandler.handleConnectedUserHangedUp();
  });
};

export const sendPreOffer = (data) => {
  socketIO.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socketIO.emit("pre-offer-answer", data);
};

//webRTC 정보를 socketIO를 이용하여 전송
export const sendDataUsingWebRTCSignaling = (data) => {
  socketIO.emit("webRTC-signaling", data);
};

//연결 끊기
export const sendUserHangUp = (data) => {
  socketIO.emit("user-hanged-up", data);
};

//랜덤 채팅 연결 상태 전송
export const changeStrangerConnectionStatus = (data) => {
  socketIO.emit("stranger-connection-status", data);
};

//랜덤 채팅이 연결된 상대 아이디 가져오기
export const getStrangerSocketId = () => {
  socketIO.emit("get-stranger-socket-id");
};
