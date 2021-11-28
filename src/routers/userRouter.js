const router = require('express').Router();
const { getSingleUser, getAllUser } = require('../controllers/userController');
const {
  checkUserExist,
} = require('../middlewares/database/databaseErrorHelpers');

// /api/users
router.get('/:id', checkUserExist, getSingleUser);
router.get('/', getAllUser);

module.exports = router;
