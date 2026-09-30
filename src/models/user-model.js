const mongoose = require('mongoose');
const courseSchema = require('./course-schema');

// User Schema 
const userSchema = new mongoose.Schema({
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
    courses: [courseSchema],
    startDateSeparation: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);