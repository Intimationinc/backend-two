const messageContainer = document.querySelector("#messages")
const inputMessageElement = document.querySelector("#input-message")
const messageSendButton = document.querySelector("#message-send-button")
const username = "Md. Rifaet - Ullah"
const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"
]
const messages = []
const protocol = location.protocol
const host = location.host
let chatSocketEndpoint = `ws://${host}/ws/chat`
if (protocol === "https:") {
    chatSocketEndpoint = `wss://${host}/ws/chat`
}
const chatSocket = new WebSocket(chatSocketEndpoint)

const scrollToBottom = () => {
    messageContainer.scrollTop = messageContainer.scrollHeight
}

const displayMessage = (message) => {
    let showOnRightSide = message.name === username
    let date = message.datetime.getDate()
    let month = months[message.datetime.getMonth()]
    let year = message.datetime.getFullYear()
    let hour = message.datetime.getHours()
    let minute = message.datetime.getMinutes()
    let second = message.datetime.getSeconds()
    let partOfTheDay = "AM"
    if (hour > 12) {
        partOfTheDay = "PM"
        hour = 24 - hour
    }

    let messageCard = document.createElement("div")
    let nameContainer = document.createElement("h4")
    let messageTime = document.createElement("p")
    let messageContent = document.createElement("p")

    nameContainer.classList.add("font-bold", "mb-1")
    nameContainer.innerText = message.name

    messageTime.classList.add("text-xs", "text-gray-600", "mb-4")
    messageTime.innerText = `${date} ${month} ${year} at ${hour}:${minute}:${second} ${partOfTheDay}`

    messageContent.classList.add("text-xl", "text-gray-700")
    messageContent.innerText = message.text

    messageCard.appendChild(nameContainer)
    messageCard.appendChild(messageTime)
    messageCard.appendChild(messageContent)

    if (showOnRightSide) {
        messageCard.classList.add("w-2/3", "p-6", "m-6", "ml-auto", "border-2", "bg-white", "rounded-lg", "shadow-lg")
    } else {
        messageCard.classList.add("w-2/3", "p-6", "m-6", "border-2", "bg-white", "rounded-lg", "shadow-lg")
    }
    messageContainer.appendChild(messageCard)

    scrollToBottom()
}

const sendMessage = (message) => {
    let strippedMessage = message.trim()
    if (strippedMessage.length > 0) {
        let formattedMessage = {
            name: username,
            datetime: new Date(),
            text: message
        }

        messages.push(formattedMessage)
        displayMessage(formattedMessage)
        chatSocket.send(JSON.stringify(formattedMessage))
    }
    inputMessageElement.value = ""
}

inputMessageElement.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && e.shiftKey === false) {
        sendMessage(inputMessageElement.value)
    }
})

messageSendButton.addEventListener("click", () => {
    sendMessage(inputMessageElement.value)
})

chatSocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    let formattedMessage = {
        name: data.name,
        datetime: new Date(data.datetime),
        text: data.text
    }
    messages.push(formattedMessage)
    displayMessage(formattedMessage)
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};
