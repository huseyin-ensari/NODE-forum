const router = require('express').Router();
// routers
const questionRouter = require('./questionRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

// api/
router.use('/auth', authRouter);
router.use('/questions', questionRouter);
router.use('/users', userRouter);

module.exports = router;
