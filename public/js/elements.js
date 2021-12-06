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

  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");

  const rejectCallImg = document.createElement("img");
  rejectCallImg.src = "./utils/images/rejectCall.png";
  rejectCallButton.appendChild(rejectCallImg);

  buttonContainer.appendChild(acceptCallButton);
  buttonContainer.appendChild(rejectCallButton);

  dialogContent.appendChild(title);
  dialogContent.appendChild(imageContainer);
  dialogContent.appendChild(buttonContainer);

  dialog.appendChild(dialogContent);
  return dialog;
};
