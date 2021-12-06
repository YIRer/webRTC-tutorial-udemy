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
