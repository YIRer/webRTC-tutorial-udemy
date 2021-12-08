import * as constants from "./constants.js";
import * as elements from "./elements.js";

export const updatePersonalCode = (socketID) => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );

  personalCodeParagraph.innerHTML = socketID;
};

export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Viedo";

  const incomingCallDialog = elements.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );

  const dialogHTML = document.getElementById("dialog");

  dialogHTML.querySelectorAll("*").forEach((dialog) => dialog.remove());

  dialogHTML.appendChild(incomingCallDialog);
};

export const showCallingDialog = (rejectCallHandler) => {
  const callingDialog = elements.getCallingDialog(rejectCallHandler);

  const dialogHTML = document.getElementById("dialog");

  dialogHTML.querySelectorAll("*").forEach((dialog) => dialog.remove());

  dialogHTML.appendChild(callingDialog);
};

export const removeAllDialogs = () => {
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
};

export const showInfoDialog = (preOfferAnswer) => {
  let title = "";
  let description = "";

  switch (preOfferAnswer) {
    case constants.preOfferAnswer.CALL_REJECTED:
      title = "Call Rejected";
      description = "Callee rejected your call";
      break;

    case constants.preOfferAnswer.CALLEE_NOT_FOUND:
      title = "Callee not found";
      description = "Please Check personal code";
      break;

    case constants.preOfferAnswer.CALL_UNAVAILABLE:
      title = "Call is not possible";
      description = "Probably callee is busy. Please try again later";
      break;

    default:
      break;
  }

  const initDialog = elements.getInfoDialog(title, description);

  const dialog = document.getElementById("dialog");

  dialog.appendChild(initDialog);

  setTimeout(() => {
    removeAllDialogs();
  }, 4000);
};

export const showCallElements = (callType) => {
  switch (callType) {
    case constants.callType.CHAT_PERSONAL_CODE:
      showChatCallElements();
      break;

    case constants.callType.VIDEO_PERSONAL_CODE:
      showVideoCallElements();
      break;

    default:
      break;
  }
};

const showChatCallElements = () => {
  const finishConnectionChatButtonContainer = document.getElementById(
    "finish_chat_button_container"
  );

  showElement(finishConnectionChatButtonContainer);

  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);
  disableDashboard();
};

const showVideoCallElements = () => {
  const callButtons = document.getElementById("call_buttons");
  const remoteButtons = document.getElementById("remote_video");
  const newMessageInput = document.getElementById("new_message");
  const placeholder = document.getElementById("video_placeholder");

  showElement(newMessageInput);
  showElement(callButtons);
  showElement(remoteButtons);

  hideElement(placeholder);
  disableDashboard();
};

const enableDashboard = () => {
  const dashboardBlocker = document.getElementById("dashboard_blur");
  if (!dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.add("display_none");
  }
};

const disableDashboard = () => {
  const dashboardBlocker = document.getElementById("dashboard_blur");
  if (dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.remove("display_none");
  }
};

const hideElement = (elements) => {
  if (!elements.classList.contains("display_none")) {
    elements.classList.add("display_none");
  }
};

const showElement = (elements) => {
  if (elements.classList.contains("display_none")) {
    elements.classList.remove("display_none");
  }
};

export const updateLocalVideo = (stream) => {
  const localVideo = document.getElementById("local_video");
  console.log(stream);
  localVideo.srcObject = stream;

  localVideo.addEventListener("loadedmetadata", () => {
    localVideo.play();
  });
};

export const updateRemoteVideo = (stream) => {
  const remoteVideo = document.getElementById("remote_video");
  remoteVideo.srcObject = stream;
};

export const updateMicButton = (micActive) => {
  const micButtonImage = document.getElementById("mic_button_image");
  micButtonImage.src = `./utils/images/${micActive ? "mic" : "micOff"}.png`;
};

export const updateCameraButton = (cameraActive) => {
  const cameraButtonImage = document.getElementById("camera_button_image");
  cameraButtonImage.src = `./utils/images/${
    cameraActive ? "camera" : "cameraOff"
  }.png`;
};

export const appendMessage = (message, right = true) => {
  const messageContainer = document.getElementById("messages_container");
  const messageElement = right
    ? elements.getRightMessage(message)
    : elements.getLeftMessage(message);

  messageContainer.appendChild(messageElement);
};

export const clearMessenger = () => {
  const messageContainer = document.getElementById("messages_container");
  messageContainer.querySelectorAll("*").forEach((ele) => ele.remove());
};

export const showRecordingPannel = () => {
  const recordingButtons = document.getElementById("video_recording_buttons");
  showElement(recordingButtons);

  const startRecordingButton = document.getElementById(
    "start_recording_button"
  );

  hideElement(startRecordingButton);
};

export const resetRecordingButtons = () => {
  const startRecordingButton = document.getElementById(
    "start_recording_button"
  );

  const recordingButtons = document.getElementById("video_recording_buttons");

  showElement(startRecordingButton);
  hideElement(recordingButtons);
};

export const switchRecordingButtons = (swithForResumeButton = false) => {
  const resumeButton = document.getElementById("resume_recording_button");
  const pauseButton = document.getElementById("pause_recording_button");

  if (swithForResumeButton) {
    showElement(resumeButton);
    hideElement(pauseButton);
  } else {
    hideElement(resumeButton);
    showElement(pauseButton);
  }
};
