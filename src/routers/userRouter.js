const router = require('express').Router();
const { getSingleUser, getAllUser } = require('../controllers/userController');
const {
  checkUserExist,
} = require('../middlewares/database/databaseErrorHelpers');
const userQuery = require('../middlewares/query/userQuery');
const User = require('../models/User');

// /api/users
router.get('/:id', checkUserExist, getSingleUser);
router.get('/', userQuery(User), getAllUser);

module.exports = router;
