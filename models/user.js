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
        defualt: true
    },
    tasks: [taskSchema]
})

// Class Schema (subdocument)
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
    startDate: {
        type: Date,
        required: true
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

// User Schema 
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    classes: [classSchema]
}, {
    timestamps: true  // Adds createdAt and updatedAt
});

module.exports = mongoose.model('User', UserSchema);