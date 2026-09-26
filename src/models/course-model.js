const mongoose = require('mongoose');
const taskGroupSchema = require('./task-group-model');
const taskSchema = require('./task-model');

// Course Schema (subdocument)
const courseSchema = new mongoose.Schema({
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
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    grade: {
        type: Number,
        required: true,
        default: 0
    },
    taskGroups: {
        type: [taskGroupSchema],
        default: []
    },
    uniqueTasks: {
        type: [taskSchema],
        default: []
    },
}, { _id: true });

module.exports = courseSchema;