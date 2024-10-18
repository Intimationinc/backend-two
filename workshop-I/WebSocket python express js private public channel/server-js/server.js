const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan'); // Import morgan for logging

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(morgan('combined')); // Use morgan for logging HTTP requests

const validUsernames = new Set(['user123', 'user456']);
const authenticatedUsers = new Set();

// Route to handle authentication
app.post('/authenticate', (req, res) => {
    const { username } = req.body;
    console.log(`Authentication attempt for username: ${username}`);

    if (validUsernames.has(username)) {
        authenticatedUsers.add(username);
        console.log(`User authenticated: ${username}`);
        return res.status(200).json({ success: true, message: 'Authentication successful.' });
    }

    console.warn(`Authentication failed for username: ${username}`);
    return res.status(401).json({ success: false, message: 'Authentication failed.' });
});

// WebSocket server connection handling
wss.on('connection', (ws) => {
    let userChannel = 'public'; // Default to public channel

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(`Message received: ${message}`);

        // Set username and userChannel
        let username = data.username || 'Anonymous'; // Use username from the data or default to Anonymous

        if (data.channel) {
            userChannel = data.channel; // Set user channel (public or private)
            ws.send(JSON.stringify({ info: `Connected to ${userChannel} channel.` }));
            console.log(`User ${username} connected to ${userChannel} channel.`);
        }

        // Handle message broadcasting
        if (data.message) {
            // For public messages, broadcast to all clients
            if (userChannel === 'public') {
                wss.clients.forEach(client => {
                    // Ensure the message is sent to all clients in the public channel
                    if (client.readyState === WebSocket.OPEN) {
                        const response = {
                            channel: 'public',
                            message: data.message,
                            username: username // Send the actual username
                        };
                        client.send(JSON.stringify(response));
                        console.log(`Broadcasting message to public channel: ${data.message}`);
                        console.log('==> response:', JSON.stringify(response));
                    }
                });
            }

            // For private messages, check if the user is authenticated
            else if (userChannel === 'private') {
                if (authenticatedUsers.has(username)) {
                    wss.clients.forEach(client => {
                        // Ensure the message is sent to clients in the same private channel // && client.username === username
                        if (client.readyState === WebSocket.OPEN ) {
                            const response = {
                                channel: 'private',
                                message: data.message,
                                username: username // Send the actual username
                            };
                            client.send(JSON.stringify(response));
                            console.log(`Broadcasting message to private channel for user ${username}: ${data.message}`);
                            console.log('==> response:', JSON.stringify(response));
                        }
                    });
                } else {
                    ws.send(JSON.stringify({ error: 'Authentication required for private chat.' }));
                    console.warn(`User not authenticated: ${username}`);
                }
            }
        }

        // Store the username in the WebSocket instance
        ws.username = username; // Store the username after it's been set
    });

    ws.on('close', () => {
        console.log(`Connection closed for user: ${ws.username} on ${userChannel} channel.`);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error for user: ${ws.username}`, error);
    });
});

// Start the server
server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
