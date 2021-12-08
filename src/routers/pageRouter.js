const router = require('express').Router();
const { homePage } = require('../controllers/pageController');

router.get('/', homePage);

module.exports = router;
