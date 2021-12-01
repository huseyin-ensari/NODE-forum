const router = require('express').Router();
const {
  askNewQuestion,
  getAllQuestion,
} = require('../controllers/questionController');
const {
  getAccessToRoute,
} = require('../middlewares/authorization/authMiddleware');

// /api/questions
router.post('/ask', getAccessToRoute, askNewQuestion);
router.get('/', getAllQuestion);

module.exports = router;
