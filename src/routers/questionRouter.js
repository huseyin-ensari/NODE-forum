const router = require('express').Router();
const {
  askNewQuestion,
  getAllQuestion,
  getSingleQuestion,
} = require('../controllers/questionController');
const {
  checkQuestionExist,
} = require('../middlewares/database/databaseErrorHelpers');
const {
  getAccessToRoute,
} = require('../middlewares/authorization/authMiddleware');

// /api/questions
router.post('/ask', getAccessToRoute, askNewQuestion);
router.get('/:id', checkQuestionExist, getSingleQuestion);
router.get('/', getAllQuestion);

module.exports = router;
