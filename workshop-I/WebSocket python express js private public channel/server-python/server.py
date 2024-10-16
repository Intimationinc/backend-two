import asyncio
import websockets
import json
import logging
from flask import Flask, request, jsonify
from threading import Thread

# Set up logging for production environments
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("WebSocketServer")

app = Flask(__name__)

# Store connected clients in channels (public, private, etc.)
connected_clients = {
    "public": set(),
    "private": set(),
}

# Simple mock authentication store (valid usernames)
valid_usernames = {"user123", "user456"}  # Example authenticated users
authenticated_users = set()


def start_flask_app():
    """Start Flask app in a separate thread to handle HTTP requests."""
    app.run(port=5000, use_reloader=False, debug=False)


@app.route("/authenticate", methods=["POST"])
def authenticate():
    """Authenticate users via HTTP POST request."""
    data = request.json
    username = data.get("username")

    if username in valid_usernames:
        authenticated_users.add(username)
        logger.info(f"User {username} authenticated successfully.")
        return jsonify({"success": True, "message": "Authentication successful."}), 200
    else:
        logger.warning(f"Authentication failed for username: {username}")
        return jsonify({"success": False, "message": "Authentication failed."}), 401


async def broadcast(channel, message):
    """Broadcast messages to clients in the specified channel."""
    clients = connected_clients.get(channel, set())
    if clients:
        tasks = [client.send(message) for client in clients]
        await asyncio.gather(*tasks)
        logger.info(f"Broadcasted message to {
                    len(clients)} clients in {channel} channel.")
    else:
        logger.warning(f"No clients in {
                       channel} channel to broadcast the message.")


async def authenticate_user(username):
    """Check if the user is authenticated."""
    return username in authenticated_users


async def handle_connection(websocket, path):
    """Handle incoming WebSocket connections and messages."""
    channel = None  # Initialize channel to avoid unbound error
    try:
        initial_message = await websocket.recv()
        data = json.loads(initial_message)

        channel = data.get("channel", "public")
        username = data.get("username", None)

        # For private channels, require user authentication
        if channel == "private":
            if not username:
                await websocket.send(json.dumps({"error": "Username required for private channel."}))
                return

            is_authenticated = await authenticate_user(username)
            if not is_authenticated:
                await websocket.send(json.dumps({"error": "Authentication required."}))
                return

        connected_clients[channel].add(websocket)
        logger.info(f"Client connected to {
                    channel} channel (username: {username}).")
        await websocket.send(json.dumps({"info": f"Connected to {channel} channel."}))

        async for message in websocket:
            try:
                message_data = json.loads(message)
                if "message" in message_data:
                    await broadcast(channel, json.dumps(message_data))
                    logger.info(f"Received and broadcasted message: {
                                message_data}")
            except json.JSONDecodeError:
                logger.error(f"Invalid message format: {message}")
                await websocket.send(json.dumps({"error": "Invalid message format"}))

    except websockets.exceptions.ConnectionClosedOK:
        logger.info("Client closed the connection gracefully.")
    except websockets.exceptions.ConnectionClosedError as e:
        logger.error(f"Connection closed with error: {e}")
    finally:
        # Ensure the client is removed from all channels on disconnect
        if channel is not None:
            for clients in connected_clients.values():
                clients.discard(websocket)
            logger.info(f"Client disconnected from {channel} channel.")
        else:
            logger.info("Client disconnected before joining any channel.")


async def start_websocket_server():
    """Initialize the WebSocket server."""
    server = await websockets.serve(handle_connection, "localhost", 8765)
    logger.info("WebSocket server started on ws://localhost:8765")
    await server.wait_closed()


if __name__ == "__main__":
    try:
        # Start the Flask app in a separate thread
        flask_thread = Thread(target=start_flask_app)
        flask_thread.start()

        # Start the WebSocket server asynchronously
        asyncio.run(start_websocket_server())
    except KeyboardInterrupt:
        logger.info("Server shutting down.")
