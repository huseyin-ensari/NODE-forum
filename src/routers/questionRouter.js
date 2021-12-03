const router = require('express').Router();
const {
  askNewQuestion,
  getAllQuestion,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
} = require('../controllers/questionController');
const answerRouter = require('./answerRouter');
const {
  checkQuestionExist,
} = require('../middlewares/database/databaseErrorHelpers');
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require('../middlewares/authorization/authMiddleware');

// /api/questions
router.post('/ask', getAccessToRoute, askNewQuestion);
router.get('/:id', checkQuestionExist, getSingleQuestion);
router.get('/', getAllQuestion);
router.put(
  '/:id',
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.delete(
  '/:id',
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);
router.get('/like/:id', [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get(
  '/undolike/:id',
  [getAccessToRoute, checkQuestionExist],
  undoLikeQuestion
);

// answer router
router.use('/:questionID/answers', checkQuestionExist, answerRouter);

module.exports = router;
