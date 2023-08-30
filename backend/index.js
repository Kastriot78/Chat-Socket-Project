const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const msgRoutes = require('./routes/message');
const notificationRoutes = require('./routes/notification');
const NotificationModel = require('./model/Notification');
const app = express();
const socket = require('socket.io');
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());

const corsOptions = {
  origin: process.env.CORS_DOMAIN
};

app.use(cors(corsOptions));

app.use('/api/auth', userRoutes);
app.use('/api/messages', msgRoutes);
app.use('/api/notifications', notificationRoutes);


mongoose.connect(process.env.MONGO_URL);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: process.env.CORS_DOMAIN,
        credentials: true
    }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', async (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data);

            await NotificationModel.create({
                user: data.to,
                sender: data.from,
                message: 'You have a new message!',
            });

            socket.to(sendUserSocket).emit('notification', {
                msg: 'success'
                
            });
        }
    });

    socket.on('typing', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('typing', new Date().getDate());
        }
    });
});

app.use("/images", express.static("images"));

app.get('/', (req, res) => {
    res.send('Welcome to Chat APP...');
});

// Export the Express API
module.exports = app;
