const router = require('express').Router();
const { homePage, diagramPage } = require('../controllers/pageController');

router.get('/', homePage);
router.get('/diagram', diagramPage);

module.exports = router;
