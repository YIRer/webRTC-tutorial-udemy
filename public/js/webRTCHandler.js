import * as wss from "./wss.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";
import * as store from "./store.js";

let connectedUserDetails;

const defaultConstrains = {
  audio: true,
  video: true,
};

export const getLocalPreview = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      ui.updateLocalVideo(stream);
      store.setLocalStream(stream);
    })
    .catch((err) => {
      console.log("error occured when trying to get access to camera");
      console.log(err);
    });
};

export const sendPreOffer = (callType, calleePersonalCode) => {
  connectedUserDetails = {
    callType,
    socketId: calleePersonalCode,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    const data = {
      callType,
      calleePersonalCode,
    };

    ui.showCallingDialog(callingDialogRejectCallHandler);
    wss.sendPreOffer(data);
  }
};

export const handlePreOffer = (data) => {
  const { callType, calleePersonalCode } = data;
  connectedUserDetails = {
    socketId: calleePersonalCode,
    callType,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
  }
};

const acceptCallHandler = () => {
  console.log("accept call handler");
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
  ui.showCallElements(connectedUserDetails.callType);
};

const rejectCallHandler = () => {
  console.log("reject call handler");
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
};

const callingDialogRejectCallHandler = () => {
  console.log("reject calling handler");
};

const sendPreOfferAnswer = (preOfferAnswer) => {
  const data = {
    callSocketId: connectedUserDetails.socketId,
    preOfferAnswer,
  };

  ui.removeAllDialogs();
  wss.sendPreOfferAnswer(data);
};

export const handlePreOfferAnswer = (data) => {
  const { preOfferAnswer } = data;
  ui.removeAllDialogs();

  switch (preOfferAnswer) {
    // case constants.preOfferAnswer.CALLEE_NOT_FOUND:
    //   break;
    // case constants.preOfferAnswer.CALL_UNAVAILABLE:
    //   break;
    // case constants.preOfferAnswer.CALL_REJECTED:
    //   break;
    case constants.preOfferAnswer.CALL_ACCEPTED:
      ui.showCallElements(connectedUserDetails.callType);
      break;

    default:
      ui.showInfoDialog(preOfferAnswer);
      break;
  }
};
