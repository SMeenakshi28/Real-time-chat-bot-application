const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve a static HTML file for the client-side
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for incoming chat messages
    io.on('connection', (socket) => {
    // The server listens for the 'chat message' event from any client
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg); // Logs the message to the server's terminal
        // Now, the server will broadcast this message back out
    });
});

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});