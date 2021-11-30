const router = require('express').Router();
const {
  getAccessToRoute,
  getAdminAccess,
} = require('../middlewares/authorization/authMiddleware');

router.use([getAccessToRoute, getAdminAccess]);

// /api/admin
router.get('/', (req, res) => res.json({ msg: 'Admin test' }));

// TODO block user

module.exports = router;
