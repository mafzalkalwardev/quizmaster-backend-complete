const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/quizzes', quizController.getQuizzes);
router.post('/quizzes', quizController.createQuiz);
router.post('/quizzes/:id/delete', quizController.deleteQuiz);

module.exports = router;
