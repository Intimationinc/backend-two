# WebSocket Chat Application (Public and Private Channels)

This project is a **real-time chat application** built with **Spring Boot** using **WebSockets**. It supports both **public chat** (available to all connected users) and **private chat** (between authenticated users based on usernames,
for simplicity i've used username for authenticaion).

## What the Project Does

- **Public Chat**: Broadcast messages to all users connected to the WebSocket.
- **Private Chat**: Send private messages directly to specific users,requiring authentication via username(for simplicity).

## Implemented Technologies

- **Java 17**
- **Spring Boot 3.0.5**
- **WebSocket API**
- **Gradle** for build automation
- **Concurrent HashMap** for session management
- **HTML/CSS/JavaScript** for the frontend to test the application
- **Bootstrap** for basic UI

## How It Works

### Public Chat:
All users can connect to the public WebSocket endpoint and broadcast messages to every connected user. Messages are displayed in real time on the user interface.

### Private Chat:
Users can send private messages to each other by connecting with their **username**. Messages are sent by specifying the recipient's username followed by the message. The system checks if the recipient is connected and delivers the message only to the intended user.

### WebSocket Endpoints:
- **Public Chat**: `/public-chat`
- **Private Chat**: `/private-chat`

## How to Run the Project

### Prerequisites:
- Java 17
- Gradle

### Steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mzhj19/websocket.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd websocket
   ```
2. **Build the Application**: To build the application, run the following command:

   ```bash
   ./gradlew build
   ```

3. **Run the Application**: To run the application, run the following command:

   ```bash
   ./gradlew bootRun
   ```
Finally open the browser and hit on [http://localhost:8080](http://localhost:8080)
