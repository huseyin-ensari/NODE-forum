const router = require('express').Router({ mergeParams: true });
const {
  getAccessToRoute,
} = require('../middlewares/authorization/authMiddleware');
const {
  addAnswer,
  getAllAnswersByQuestion,
} = require('../controllers/answerController');

// /api/questions/questionID/answers
router.post('/', getAccessToRoute, addAnswer);
router.get('/', getAllAnswersByQuestion);
module.exports = router;
