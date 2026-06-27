const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

exports.getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().sort({ createdAt: -1 });
        res.render('home', { quizzes });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createQuiz = async (req, res) => {
    try {
        await Quiz.create(req.body);
        res.redirect('/quizzes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteQuiz = async (req, res) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id);
        await Question.deleteMany({ quizId: req.params.id });
        res.redirect('/quizzes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
