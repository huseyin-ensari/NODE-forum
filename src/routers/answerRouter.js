const router = require('express').Router({ mergeParams: true });
const {
  getAccessToRoute,
} = require('../middlewares/authorization/authMiddleware');
const { addAnswer } = require('../controllers/answerController');

// /api/questions/questionID/answers
router.post('/', getAccessToRoute, addAnswer);

module.exports = router;
