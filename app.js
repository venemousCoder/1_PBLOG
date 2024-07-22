const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const router = require('./routes/index');
const expressSessions = require('express-session');

app.use(expressSessions({
    cookie: { name: 'user', maxAge: 5000 },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
}))



// Mongo DB Connections
mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log('MongoDB Connection Succeeded.')
    }).catch(error => {
        console.log('Error in DB connection: ' + error)
    });

// Middleware Connections
// app.use(sessionSetter);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
<<<<<<< HEAD

app.use((req, res, next)=>{
    req.user
    console.log('REQ_URL:', req.url, 'USER:', req.user)
    next()
})

=======
app.use((req, res, next) => {
    console.log("URL_PATH:", req.url);
})
>>>>>>> 0129d55a0a10eef67aa076ef8bea3c564e2dcb72
// Routes
app.use('/', router);

// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT)
})
