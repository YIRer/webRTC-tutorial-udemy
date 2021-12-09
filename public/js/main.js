import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as ui from "./ui.js";
import * as recordingUtils from "./recordingUtils.js";
import * as strangerUtils from "./strangerUitls.js";
import { callType } from "./constants.js";

const socket = io("/");

//socketIO 연결 초기화
wss.registerSocketEvents(socket);

//개인 비디오 카메라 스트리밍
webRTCHandler.getLocalPreview();

//개인 코드 복사 버튼 클릭 이벤트 추가
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);

personalCodeCopyButton.addEventListener("click", (e) => {
  const personalCode = store.getState().socketId;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(personalCode);
  }
});

//개인 코드를 이용한 채팅, 영상 통화 화면 공유 요청 버튼

const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button"
);

const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button"
);

personalCodeChatButton.addEventListener("click", () => {
  const calleePersonalCode = document.getElementById("personal_code_input");
  webRTCHandler.sendPreOffer(
    callType.CHAT_PERSONAL_CODE,
    calleePersonalCode.value
  );
});

personalCodeVideoButton.addEventListener("click", () => {
  const calleePersonalCode = document.getElementById("personal_code_input");
  webRTCHandler.sendPreOffer(
    callType.VIDEO_PERSONAL_CODE,
    calleePersonalCode.value
  );
});

// 마이크 음소거 버튼
const micButton = document.getElementById("mic_button");
micButton.addEventListener("click", () => {
  const localStream = store.getState().localStream;
  const micEnabled = localStream.getAudioTracks()[0].enabled;

  localStream.getAudioTracks()[0].enabled = !micEnabled;
  ui.updateMicButton(!micEnabled);
});

// 카메라 영상 숨기기 버튼
const cameraButton = document.getElementById("camera_button");
cameraButton.addEventListener("click", () => {
  const localStream = store.getState().localStream;
  const cameraEnabled = localStream.getVideoTracks()[0].enabled;

  localStream.getVideoTracks()[0].enabled = !cameraEnabled;
  ui.updateCameraButton(!cameraEnabled);
});

//화면 공유
const switchForScreenShareButton = document.getElementById(
  "screen_sharing_button"
);

switchForScreenShareButton.addEventListener("click", () => {
  const screenSharingActive = store.getState().screenSharingActive;
  webRTCHandler.switchBetweenCameraAndScreenSharing(screenSharingActive);
});

//채팅 메시지 전송
const newMessageInput = document.getElementById("new_message_input");

newMessageInput.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "Enter") {
    webRTCHandler.sendMessageUsingDataChannel(e.target.value);
    ui.appendMessage(e.target.value);
    newMessageInput.value = "";
  }
});

const sendMessageButton = document.getElementById("send_message_button");
sendMessageButton.addEventListener("click", () => {
  const message = newMessageInput.value;

  webRTCHandler.sendMessageUsingDataChannel(message);
  ui.appendMessage(message);
  newMessageInput.value = "";
});

//화면 녹화 버튼
const startRecordingButton = document.getElementById("start_recording_button");
startRecordingButton.addEventListener("click", () => {
  recordingUtils.startRecording();
  ui.showRecordingPannel();
});

//화면 녹화 완료 버튼
const stopRecordingButton = document.getElementById("stop_recording_button");
stopRecordingButton.addEventListener("click", () => {
  recordingUtils.stopRecording();
  ui.resetRecordingButtons();
});

//화면 녹화 일시정지 버튼
const pauseRecordingButton = document.getElementById("pause_recording_button");
pauseRecordingButton.addEventListener("click", () => {
  recordingUtils.pauseRecording();
  ui.switchRecordingButtons(true);
});

//화면 녹화 재개 버튼
const resumeRecordingButton = document.getElementById(
  "resume_recording_button"
);
resumeRecordingButton.addEventListener("click", () => {
  recordingUtils.resumeRecording();
  ui.switchRecordingButtons();
});

//연결 끊기
const hangUpButton = document.getElementById("hang_up_button");
hangUpButton.addEventListener("click", () => {
  webRTCHandler.handleHangUp();
});

const hangUpChatButton = document.getElementById("finish_chat_call_button");
hangUpChatButton.addEventListener("click", () => {
  webRTCHandler.handleHangUp();
});

//랜덤 채팅 허용 버튼
const strangerCheckbox = document.getElementById("allow_strangers_checkbox");
strangerCheckbox.addEventListener("click", () => {
  const checkboxState = store.getState().allowConnectionFromStrangers;
  ui.updateStrangerCheckbox(!checkboxState);
  store.setAllowConnectionFromStrangers(!checkboxState);
  strangerUtils.changeStrangerConnectionStatus(!checkboxState);
});

//랜덤 채팅 버튼
const strangerChatButton = document.getElementById("stranger_chat_button");
strangerChatButton.addEventListener("click", () => {
  strangerUtils.getStrangerSocketIdAndConnect(callType.CHAT_STRANGER);
});

//랜덤 화상 채팅 버튼
const strangerVideoButton = document.getElementById("stranger_video_button");
strangerVideoButton.addEventListener("click", () => {
  strangerUtils.getStrangerSocketIdAndConnect(callType.VIDEO_STRANGER);
});
