const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/submit', resultController.submitQuiz);
router.get('/results', resultController.getResults);
router.get('/leaderboardPage', resultController.leaderboardPage);

module.exports = router;
