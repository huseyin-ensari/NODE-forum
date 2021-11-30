const router = require('express').Router();
const {
  register,
  login,
  logout,
  imageUpload,
  forgotPassword,
  resetPassword,
  editDetails,
} = require('../controllers/authController');
const {
  getAccessToRoute,
} = require('../middlewares/authorization/authMiddleware');
const profileImageUpload = require('../middlewares/assets/profileImageUpload');

// api/auth/
router.post('/register', register);
router.post('/login', login);
router.get('/logout', getAccessToRoute, logout);
router.post(
  '/upload',
  [getAccessToRoute, profileImageUpload.single('profile_image')],
  imageUpload
);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetPassword);
router.put('/edit', getAccessToRoute, editDetails);

module.exports = router;
