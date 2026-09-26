
const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pointsAchieved: {
        type: Number,
        required: false,
        default: 0
    },
    pointBasis: {
        type: Number,
        required: true,
        default: 100
    },
    dueDate: {
        type: Date,
        required: false
    },
    weight: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    graded: {
        type: Boolean,
        required: true
    }
})

module.exports = taskSchema;