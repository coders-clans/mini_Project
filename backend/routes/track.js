const express = require('express');
const router = express.Router();
const { saveQuestions,getQuestions,evaluateAnswer, deleteQuestions } = require('../controllers/track');



router.post('/save', saveQuestions);
router.get('/questions/:userId', getQuestions);
router.post('/submit-answer', evaluateAnswer);
router.delete('/delete/:userId',deleteQuestions);
module.exports = router;