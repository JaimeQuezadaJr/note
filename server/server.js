// imports
require('./config/mongoose.config');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 4000;
const socket = require('socket.io');

// create express app object
const app = express();

// express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// cookie & jwt
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true}));

// routes for login & registration
const userRoutes = require('./routes/user.routes');
userRoutes(app);


const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

const io = socket(server, {
    cors: {
        origin:'*'
    }
})

io.on('connection', (socket) => {
    console.log('NEW USER', socket.id);
    socket.on('disconnect', () => {
        console.log('USER DISCONNECTED');
    })
})