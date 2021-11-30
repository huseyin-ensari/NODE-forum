const router = require('express').Router();
const {
  getAccessToRoute,
  getAdminAccess,
} = require('../middlewares/authorization/authMiddleware');
const {
  checkUserExist,
} = require('../middlewares/database/databaseErrorHelpers');
const { blockUser } = require('../controllers/adminController');

router.use([getAccessToRoute, getAdminAccess]);

// /api/admin
router.get('/block/:id', checkUserExist, blockUser);

// TODO block user

module.exports = router;
