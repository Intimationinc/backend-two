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

wss.on('connection', (ws) => {
    let channel = 'public';
    let username;

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(`Message received: ${message}`);

        if (data.username) {
            username = data.username;
            if (!authenticatedUsers.has(username)) {
                ws.send(JSON.stringify({ error: 'Authentication required.' }));
                console.warn(`User not authenticated: ${username}`);
                return;
            }
            channel = data.channel || 'public'; // default to public channel
            ws.send(JSON.stringify({ info: `Connected to ${channel} channel.` }));
            console.log(`User ${username} connected to ${channel} channel.`);
        }

        // Handle message broadcasting here
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ channel, message: data.message, username }));
                console.log(`Broadcasting message to channel ${channel}: ${data.message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log(`Connection closed for user: ${username} on ${channel} channel.`);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error for user: ${username}`, error);
    });
});

server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
