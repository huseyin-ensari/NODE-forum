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
const questionQuery = require('../middlewares/query/questionQuery');
const answerQuery = require('../middlewares/query/answerQuery');
const Question = require('../models/Question');

// /api/questions
router.post('/ask', getAccessToRoute, askNewQuestion);
router.get(
  '/:id',
  [
    checkQuestionExist,
    answerQuery(Question, {
      population: [
        {
          path: 'user',
          select: 'name',
        },
        {
          path: 'answers',
          select: 'content',
        },
      ],
    }),
  ],
  getSingleQuestion
);
router.get(
  '/',
  questionQuery(Question, {
    population: {
      path: 'user',
      select: 'name profileImage',
    },
  }),
  getAllQuestion
);
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
