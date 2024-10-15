import json
from flask import Flask, request, jsonify
import asyncio
import websockets

app = Flask(__name__)

# Define the WebSocket URI
WEBSOCKET_URI = "ws://localhost:8765"


async def send_message_to_websocket(channel, message):
    """Send a message to the WebSocket server to broadcast."""
    try:
        async with websockets.connect(WEBSOCKET_URI) as websocket:
            await websocket.send(json.dumps({"channel": channel, "message": message}))
    except Exception as e:
        print(f"Error sending message to WebSocket: {e}")


@app.route("/send", methods=["POST"])
def send_message():
    """Endpoint to send a message."""
    data = request.get_json()
    message = data.get("message")
    channel = data.get("channel", "public")  # Default to public channel

    # Use asyncio.run to send the message to the WebSocket server
    asyncio.run(send_message_to_websocket(channel, message))

    return jsonify({"status": "Message sent successfully"}), 200


if __name__ == "__main__":
    app.run(port=5000)
