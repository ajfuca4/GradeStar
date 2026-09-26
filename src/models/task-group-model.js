const mongoose = require('mongoose');
const taskSchema = require('./task-model');

// Task Group Schema 
const taskGroupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    isEvenWeight: {
        type: Boolean,
        required: true,
        default: true
    },
    tasks: [taskSchema]
})

module.exports = taskGroupSchema;