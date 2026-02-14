const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connect = mongoose.connect(process.env.MONGO_URI);

// Connect to MongoDB
connect.then(() => {
    console.log("Connected to Database");
}).catch (() => {
    console.log('Not Connected to Database');
})


/*// Task Schema
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: false,
    },
    dueDate: {
        type: Date,
        required: false
    },
    taskGroup: {
        type: String,
        required: false
    },
    graded: {
        type: Boolean,
        required: true
    }
})*/

// Class Schema
const classSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: false
    },
    colour: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true,
        default: 0
    },
    /*tasks: [taskSchema]*/
})

// User Schema 
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    classes: [classSchema]
});

// Collection Part
const collection = new mongoose.model('users', UserSchema);

module.exports = collection;