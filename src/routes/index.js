const router = require('express').Router();

const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const postRouter = require('./post.route');
const connectionRouter = require('./connection.route');
const postReactionRouter = require('./post_reaction.route');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/connections', connectionRouter);
router.use('/post_reactions', postReactionRouter);

module.exports = router;
