const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/questions', questionController.addQuestion);
router.get('/questions/:quizId', questionController.getQuestions);

module.exports = router;
