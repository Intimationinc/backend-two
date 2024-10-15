import asyncio
import websockets
import json
import logging

# Set up logging for production environments
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("WebSocketServer")

# Store connected clients in channels (public, private, etc.)
connected_clients = {
    "public": set(),
    "private": set(),
}


async def broadcast(channel, message):
    """Broadcast messages to clients in the specified channel."""
    clients = connected_clients.get(channel, set())
    if clients:
        # Send the message to each client asynchronously
        tasks = [client.send(message) for client in clients]
        await asyncio.gather(*tasks)
        logger.info(f"Broadcasted message to {
                    len(clients)} clients in {channel} channel.")
    else:
        logger.warning(f"No clients in {
                       channel} channel to broadcast the message.")


async def handle_connection(websocket, path):
    """Handle incoming WebSocket connections and messages."""
    try:
        # Receive the initial message from the client (for channel joining)
        initial_message = await websocket.recv()
        data = json.loads(initial_message)

        # Default to 'public' channel if no channel is specified
        channel = data.get("channel", "public")

        # Register the client to the appropriate channel
        connected_clients[channel].add(websocket)
        logger.info(f"Client connected to {channel} channel.")
        await websocket.send(json.dumps({"info": f"Connected to {channel} channel."}))

        # Handle incoming messages from the client
        async for message in websocket:
            try:
                message_data = json.loads(message)
                if "message" in message_data:
                    # Broadcast the message to the channel
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
        for clients in connected_clients.values():
            clients.discard(websocket)
        logger.info(f"Client disconnected from {channel} channel.")


async def broadcast_from_http(channel, message):
    """Broadcast messages from an external HTTP request (Flask)"""
    await broadcast(channel, json.dumps({"channel": channel, "message": message}))


async def start_server():
    """Initialize the WebSocket server."""
    server = await websockets.serve(handle_connection, "localhost", 8765)
    logger.info("WebSocket server started on ws://localhost:8765")
    await server.wait_closed()

if __name__ == "__main__":
    try:
        asyncio.run(start_server())
    except KeyboardInterrupt:
        logger.info("Server shutting down.")
