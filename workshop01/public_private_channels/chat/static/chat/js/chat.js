const messageContainer = document.querySelector("#messages");
const inputMessageElement = document.querySelector("#input-message");
const messageSendButton = document.querySelector("#message-send-button");
const username = localStorage.getItem("name");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const messages = [];
const protocol = location.protocol;
const host = location.host;
let chatSocketEndpoint = `ws://${host}/ws/chat`;
if (protocol === "https:") {
  chatSocketEndpoint = `wss://${host}/ws/chat`;
}
const chatSocket = new WebSocket(chatSocketEndpoint);

const scrollToBottom = () => {
  messageContainer.scrollTop = messageContainer.scrollHeight;
};

const displayMessage = (message) => {
  if (message.messageType === "notification") {
    displaySystemMessage(message);
  } else {
    displayChatMessage(message);
  }

  scrollToBottom();
};

const displayChatMessage = (message) => {
  let showOnRightSide = message.name === username;

  let messageCard = document.createElement("div");
  let nameContainer = document.createElement("h4");
  let messageTime = document.createElement("p");
  let messageContent = document.createElement("p");

  nameContainer.classList.add("font-bold", "mb-1");
  nameContainer.innerText = message.name;

  messageTime.classList.add("text-xs", "text-gray-600", "mb-4");
  messageTime.innerText = message.datetime;

  messageContent.classList.add("text-xl", "text-gray-700");
  messageContent.innerText = message.message;

  messageCard.appendChild(nameContainer);
  messageCard.appendChild(messageTime);
  messageCard.appendChild(messageContent);

  if (showOnRightSide) {
    messageCard.classList.add(
      "w-2/3",
      "p-6",
      "m-6",
      "ml-auto",
      "border-2",
      "bg-white",
      "rounded-lg",
      "shadow-lg"
    );
  } else {
    messageCard.classList.add(
      "w-2/3",
      "p-6",
      "m-6",
      "border-2",
      "bg-white",
      "rounded-lg",
      "shadow-lg"
    );
  }
  messageContainer.appendChild(messageCard);
};

const displaySystemMessage = (message) => {
  let messageCard = document.createElement("div");
  let horizontalLine = document.createElement("hr");
  let messageContent = document.createElement("p");

  horizontalLine.classList.add("w-3/5", "border-1", "border-blue-100");
  messageContent.classList.add(
    "absolute",
    "text-xs",
    "text-gray-600",
    "bg-white",
    "px-3",
    "left-1/2",
    "-translate-x-1/2"
  );
  messageContent.innerText = message.message;

  messageCard.appendChild(horizontalLine);
  messageCard.appendChild(messageContent);

  messageCard.classList.add(
    "my-8",
    "flex",
    "justify-center",
    "items-center",
    "relative"
  );
  messageContainer.appendChild(messageCard);
};

const sendMessage = (message) => {
  let strippedMessage = message.trim();
  if (strippedMessage.length > 0) {
    let formattedMessage = {
      message: message,
    };

    chatSocket.send(JSON.stringify(formattedMessage));
    inputMessageElement.value = "";
  }
};

inputMessageElement.addEventListener("keydown", (e) => {
  if (e.code === "Enter" && e.shiftKey === false) {
    sendMessage(inputMessageElement.value);
  }
});

messageSendButton.addEventListener("click", () => {
  sendMessage(inputMessageElement.value);
});

chatSocket.onopen = function (e) {
  console.log("Connection established");
};

chatSocket.onmessage = function (e) {
  let data = JSON.parse(e.data);

  if (data.type === "chatHistory") {
    data.messages.forEach((message) => {
      messages.push(message);
      displayMessage(message);
    });
  } else if (data.type === "chatMessage") {
    messages.push(data.message);
    displayMessage(data.message);
  } else {
    console.log(data);
  }

  scrollToBottom();
};

chatSocket.onclose = function (e) {
  console.log("Chat socket closed unexpectedly");
  console.error(e);
};
