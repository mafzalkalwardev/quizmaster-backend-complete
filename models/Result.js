const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    quizTitle: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true,
        min: 0
    },
    totalQuestions: {
        type: Number,
        required: true,
        min: 0
    },
    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
