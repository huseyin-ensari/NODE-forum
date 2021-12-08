const router = require('express').Router();
const {
  homePage,
  diagramPage,
  userPage,
} = require('../controllers/pageController');

router.get('/', homePage);
router.get('/diagram', diagramPage);
router.get('/user', userPage);

module.exports = router;
