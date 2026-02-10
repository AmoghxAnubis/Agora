const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

// Store active users per room
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', ({ roomId, userData }) => {
        socket.join(roomId);

        // Add user to room
        if (!rooms.has(roomId)) {
            rooms.set(roomId, new Map());
        }
        rooms.get(roomId).set(socket.id, userData);

        // Notify others in the room
        socket.to(roomId).emit('user-joined', userData);

        // Send current users list to the new user
        const currentUsers = Array.from(rooms.get(roomId).values());
        socket.emit('room-users', currentUsers);

        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('code-change', ({ roomId, code, language }) => {
        socket.to(roomId).emit('code-update', { code, language });
    });

    socket.on('cursor-move', ({ roomId, position, userId, userName, color }) => {
        socket.to(roomId).emit('cursor-update', { position, userId, userName, color });
    });

    socket.on('leave-room', (roomId) => {
        socket.leave(roomId);
        if (rooms.has(roomId)) {
            rooms.get(roomId).delete(socket.id);
            socket.to(roomId).emit('user-left', socket.id);
            console.log(`User ${socket.id} left room ${roomId}`);
        }
    });

    socket.on('disconnect', () => {
        // Remove user from all rooms
        rooms.forEach((users, roomId) => {
            if (users.has(socket.id)) {
                users.delete(socket.id);
                io.to(roomId).emit('user-left', socket.id);
            }
        });
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
