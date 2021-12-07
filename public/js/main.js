import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
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
  console.log("clicked chat button");
  const calleePersonalCode = document.getElementById("personal_code_input");
  webRTCHandler.sendPreOffer(
    callType.CHAT_PERSONAL_CODE,
    calleePersonalCode.value
  );
});

personalCodeVideoButton.addEventListener("click", () => {
  console.log("clicked video button");
  const calleePersonalCode = document.getElementById("personal_code_input");
  webRTCHandler.sendPreOffer(
    callType.VIDEO_PERSONAL_CODE,
    calleePersonalCode.value
  );
});

//
