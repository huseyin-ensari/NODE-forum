const router = require('express').Router();
// routers
const questionRouter = require('./questionRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');

// api/
router.use('/auth', authRouter);
router.use('/questions', questionRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);

module.exports = router;
