const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

exports.addQuestion = async (req, res) => {
    try {
        await Question.create(req.body);
        res.redirect(`/questions/${req.body.quizId}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getQuestions = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);

        if (!quiz) {
            return res.status(404).render('error', {
                title: 'Quiz not found',
                message: 'This quiz no longer exists.'
            });
        }

        const questions = await Question.find({
            quizId: req.params.quizId
        }).sort({ createdAt: 1 });

        res.render('quiz', { quiz, questions });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
