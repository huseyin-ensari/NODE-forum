const router = require('express').Router({ mergeParams: true });
const {
  getAccessToRoute,
} = require('../middlewares/authorization/authMiddleware');
const {
  checkQuestionAndAnswerExist,
} = require('../middlewares/database/databaseErrorHelpers');
const {
  addAnswer,
  getAllAnswersByQuestion,
  getSingleAnswer,
} = require('../controllers/answerController');

// /api/questions/questionID/answers
router.post('/', getAccessToRoute, addAnswer);
router.get('/', getAllAnswersByQuestion);
router.get('/:answerID', checkQuestionAndAnswerExist, getSingleAnswer);

module.exports = router;
