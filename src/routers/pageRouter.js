const router = require('express').Router();
const {
  homePage,
  diagramPage,
  userPage,
  questionPage,
  answerPage,
} = require('../controllers/pageController');

router.get('/', homePage);
router.get('/diagram', diagramPage);
router.get('/user', userPage);
router.get('/question', questionPage);
router.get('/answer', answerPage);

module.exports = router;
