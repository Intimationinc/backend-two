# Chat Application with Public and Private Channels

This project is a real-time chat application built using NestJS with WebSocket support, Prisma as the ORM for PostgreSQL, and middleware for cache control. The application supports both public and private messaging channels, allowing users to communicate seamlessly.

## Table of Contents

1. [Cache Control Feature](#cache-control-feature)
2. [Public and Private Channel](#public-and-private-channel)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [License](#license)

## Cache Control Feature

### Overview

The cache control feature is implemented through middleware to manage the caching behavior for different routes.

### Functionality

- **Public Routes**: Set to allow caching for a specified duration (e.g., 5 minutes) for routes like `/users`.
- **Private Routes**: Configured to prevent caching to ensure sensitive data is not stored.

### Middleware

The middleware checks the request path and applies appropriate cache control headers based on whether the route is public or private.

## Public and Private Channel

### Overview

The chat application facilitates both public and private channels, allowing users to send messages in a public chat room or directly to specific users privately.

### WebSocket Setup

- Establishes WebSocket connections for real-time messaging.
- Listens for events related to public and private messages.

### Public Messaging

- Users can join a public channel and send messages that are broadcasted to all connected clients.

### Private Messaging

- After logging in, users can send private messages to specific users. These messages are delivered only to the intended recipient.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient server-side applications.
- **WebSockets**: Enables real-time, bidirectional communication between clients and the server.
- **Prisma**: An ORM (Object Relational Mapping) tool for database interactions with PostgreSQL.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.

## Installation

### Steps

1. Please check the folder structure.
2. Navigate to the project directory (websocket-prisma-postgres).
3. Install the required dependencies.
4. Set up the PostgreSQL database and configure environment variables.
5. Run migrations to set up the database schema.

## Usage

### Running the Application

- Start the application using the command line.
- Connect to the WebSocket server using a WebSocket client to interact with public and private messaging functionalities.

## License

This project is licensed under the MIT License.
