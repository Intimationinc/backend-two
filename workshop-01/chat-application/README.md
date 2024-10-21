# Chat Application

This is a real-time chat application built with React for the frontend and NestJS for the backend, using Socket.IO for real-time communication.

## Features

- Public chat room
- Private chat rooms
- Real-time message updates
- User-friendly interface

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Project Structure

- `client/`: React frontend application
- `backend/`: NestJS backend application

## Setup and Running the Application

### Backend (NestJS)

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run start:dev
   ```

   The backend server will start on `http://localhost:3000`.

### Frontend (React)

1. Open a new terminal and navigate to the client directory:

   ```
   cd client
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

   The frontend application will start and be available at `http://localhost:5173`.

## Usage

1. Open your browser and go to `http://localhost:5173`.
2. You'll be assigned a random username.
3. Choose between Public Chat or Private Chat.
4. For Private Chat, enter a room ID to join or create a new room.
5. Start chatting!

## Technologies Used

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: NestJS, Socket.IO
- Real-time Communication: Socket.IO

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
