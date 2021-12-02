const router = require('express').Router();
const {
  askNewQuestion,
  getAllQuestion,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
} = require('../controllers/questionController');
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

module.exports = router;
