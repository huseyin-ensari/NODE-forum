const router = require('express').Router();
const { getAll } = require('../controllers/questionController');

router.get('/', getAll);

module.exports = router;
