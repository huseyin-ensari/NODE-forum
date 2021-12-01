const router = require('express').Router();
const { askNewQuestion } = require('../controllers/questionController');
const {
  getAccessToRoute,
} = require('../middlewares/authorization/authMiddleware');

// /api/questions
router.post('/ask', getAccessToRoute, askNewQuestion);

module.exports = router;
