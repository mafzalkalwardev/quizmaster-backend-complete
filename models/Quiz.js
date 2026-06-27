const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    totalMarks: {
        type: Number,
        required: true,
        min: 1
    }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
