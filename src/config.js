const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connect = mongoose.connect(process.env.MONGO_URI);

// Connect to MongoDB
connect.then(() => {
    console.log("Connected to Database");
}).catch (() => {
    console.log('Not Connected to Database');
})

// User Schema 
const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Collection Part
const collection = new mongoose.model('users', LoginSchema);

module.exports = collection;