const mongoose = require('mongoose');

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
    grade: {
        type: Number,
        required: true,
        default: 0
    }
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