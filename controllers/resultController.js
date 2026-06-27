const Result = require('../models/Result');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

exports.submitQuiz = async (req, res) => {
    try {
        const { studentName, quizId, answers } = req.body;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).render('error', {
                title: 'Quiz not found',
                message: 'This quiz no longer exists.'
            });
        }

        const questions = await Question.find({ quizId });

        if (!questions.length) {
            return res.status(400).render('error', {
                title: 'No questions',
                message: 'This quiz does not have any questions yet.'
            });
        }

        let score = 0;

        questions.forEach((q) => {
            if (answers && answers[q._id.toString()] === q.correctAnswer) {
                score++;
            }
        });

        const percentage = Math.round((score / questions.length) * 100);

        const result = await Result.create({
            studentName,
            quizTitle: quiz.title,
            score,
            totalQuestions: questions.length,
            percentage
        });

        res.render('result', { result });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getResults = async (req, res) => {
    try {
        const results = await Result.find().sort({ createdAt: -1 });
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.leaderboardPage = async (req, res) => {

    try {

        const leaders = await Result.find()
        .sort({ percentage: -1, score: -1, createdAt: 1 })
        .limit(10);

        res.render('leaderboard', { leaders });

    } catch (error) {
        res.status(500).send(error.message);
    }
};
