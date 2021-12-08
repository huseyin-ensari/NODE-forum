const router = require('express').Router();
const {
  homePage,
  diagramPage,
  userPage,
  questionPage,
} = require('../controllers/pageController');

router.get('/', homePage);
router.get('/diagram', diagramPage);
router.get('/user', userPage);
router.get('/question', questionPage);

module.exports = router;
