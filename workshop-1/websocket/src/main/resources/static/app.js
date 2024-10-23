let publicWs, privateWs, currentUser;

// Connect to the public WebSocket channel
function connect() {
    publicWs = new WebSocket("ws://localhost:8080/public-chat");

    // Public chat message handler
    publicWs.onmessage = function (e) {
        printPublicMessage(e.data);
    };
    document.getElementById("connectButton").disabled = true;
    document.getElementById("connectButton").value = "Connected to Public Chat";
    document.getElementById("name").disabled = true;
    currentUser = document.getElementById("name").value;
    console.log(currentUser);
}

// Connect to the private WebSocket channel
function connectToPrivateChat(username) {
    console.log(username);
    if (!username) {
        alert("Please provide a username.");
        return;
    }

    privateWs = new WebSocket("ws://localhost:8080/private-chat?username=" + username);

    // Handle incoming private messages
    privateWs.onmessage = function (event) {
        printPrivateMessage(event.data);
    };
}

// Send a public message
function sendToGroupChat() {
    if (!publicWs) return;
    let messageText = document.getElementById("publicMessage").value;
    document.getElementById("publicMessage").value = "";

    let messageObject = {
        name: currentUser,
        message: messageText,
    };

    let newMessage = document.createElement("div");
    newMessage.innerHTML = currentUser + ": " + messageText;
    newMessage.className = "outgoing-message";
    document.getElementById("publicMessages").appendChild(newMessage);

    publicWs.send(JSON.stringify(messageObject));
}

// Send a private message
function sendPrivateMessage() {
    if (!privateWs) return;
    let recipient = document.getElementById("recipient").value;
    let messageText = document.getElementById("privateMessage").value;

    // Check if recipient is the same as current user
    if (recipient === currentUser) {
        alert("You cannot send a private message to yourself.");
        return;
    }

    privateWs.send(recipient + ":" + messageText);
    document.getElementById("privateMessage").value = ""; // Clear the input field
    let newMessage = document.createElement("div");
    newMessage.innerHTML = "To " + recipient + ": " + messageText;
    newMessage.className = "outgoing-message";
    document.getElementById("privateMessages").appendChild(newMessage);
}

// Print received public messages
function printPublicMessage(data) {
    let messagesDiv = document.getElementById("publicMessages");
    let messageData = JSON.parse(data);
    let newMessage = document.createElement("div");
    newMessage.className = "incoming-message";
    newMessage.innerHTML = messageData.name + " : " + messageData.message;
    messagesDiv.appendChild(newMessage);
}

// Print received private messages
function printPrivateMessage(data) {
    let messagesDiv = document.getElementById("privateMessages");
    let newMessage = document.createElement("div");
    newMessage.className = "incoming-message";
    newMessage.innerText = data;
    messagesDiv.appendChild(newMessage);
}