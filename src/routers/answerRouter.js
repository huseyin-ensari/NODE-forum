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
  editAnswer,
  deleteAnswer,
  likeAnswer,
  undoLikeAnswer,
} = require('../controllers/answerController');
const {
  getAnswerOwnerAccess,
} = require('../middlewares/authorization/authMiddleware');

// /api/questions/questionID/answers
router.post('/', getAccessToRoute, addAnswer);
router.get('/', getAllAnswersByQuestion);
router.get('/:answerID', checkQuestionAndAnswerExist, getSingleAnswer);
router.get(
  '/:answerID/like',
  [checkQuestionAndAnswerExist, getAccessToRoute],
  likeAnswer
);
router.get(
  '/:answerID/undolike',
  [checkQuestionAndAnswerExist, getAccessToRoute],
  undoLikeAnswer
);
router.put(
  '/:answerID',
  [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  editAnswer
);
router.delete(
  '/:answerID',
  [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  deleteAnswer
);

module.exports = router;
