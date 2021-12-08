export const getIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  console.log("getIncomingCallDialog");

  const dialog = document.createElement("div");
  dialog.classList.add("dialog_wrapper");

  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");

  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = `Incoming ${callType} call`;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("dialog_image_container");

  const image = document.createElement("img");
  image.src = "./utils/images/dialogAvatar.png";
  imageContainer.appendChild(image);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_button_container");

  const acceptCallButton = document.createElement("button");
  acceptCallButton.classList.add("dialog_accept_call_button");

  const acceptCallImg = document.createElement("img");
  acceptCallImg.src = "./utils/images/acceptCall.png";
  acceptCallButton.appendChild(acceptCallImg);

  acceptCallButton.addEventListener("click", () => {
    acceptCallHandler();
  });

  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");

  const rejectCallImg = document.createElement("img");
  rejectCallImg.src = "./utils/images/rejectCall.png";
  rejectCallButton.appendChild(rejectCallImg);

  rejectCallButton.addEventListener("click", () => {
    rejectCallHandler();
  });

  buttonContainer.appendChild(acceptCallButton);
  buttonContainer.appendChild(rejectCallButton);

  dialogContent.appendChild(title);
  dialogContent.appendChild(imageContainer);
  dialogContent.appendChild(buttonContainer);

  dialog.appendChild(dialogContent);
  return dialog;
};

export const getCallingDialog = (rejectCallHandler) => {
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_wrapper");

  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");

  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = "Calling";

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("dialog_image_container");

  const image = document.createElement("img");
  image.src = "./utils/images/dialogAvatar.png";
  imageContainer.appendChild(image);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_button_container");

  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");

  const rejectCallImg = document.createElement("img");
  rejectCallImg.src = "./utils/images/rejectCall.png";
  rejectCallButton.appendChild(rejectCallImg);

  buttonContainer.appendChild(rejectCallButton);

  dialogContent.appendChild(title);
  dialogContent.appendChild(imageContainer);
  dialogContent.appendChild(buttonContainer);

  dialog.appendChild(dialogContent);

  return dialog;
};

export const getInfoDialog = (dialogTitle, dialogDescription) => {
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_wrapper");

  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");

  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = dialogTitle;

  const description = document.createElement("p");
  description.classList.add("dialog_description");
  description.innerHTML = dialogDescription;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("dialog_image_container");

  const image = document.createElement("img");
  image.src = "./utils/images/dialogAvatar.png";
  imageContainer.appendChild(image);

  dialogContent.appendChild(title);
  dialogContent.appendChild(imageContainer);
  dialogContent.appendChild(description);

  dialog.appendChild(dialogContent);

  return dialog;
};

export const getLeftMessage = (message) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message_left_container");

  const messageParagraph = document.createElement("p");
  messageParagraph.classList.add("message_left_paragraph");
  messageParagraph.innerHTML = message;

  messageContainer.appendChild(messageParagraph);

  return messageContainer;
};

export const getRightMessage = (message) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message_right_container");

  const messageParagraph = document.createElement("p");
  messageParagraph.classList.add("message_right_paragraph");
  messageParagraph.innerHTML = message;

  messageContainer.appendChild(messageParagraph);

  return messageContainer;
};
