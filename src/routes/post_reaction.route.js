const { container } = require('../loaders/container.loader');
const { authenticate } = require('../middlewares/authenticate.middleware');
const { validateSchema } = require('../middlewares/validate_schema.middleware');
const {
  GET_ALL_POST_REACTIONS,
  GET_POST_REACTION,
  GIVE_REACTION,
} = require('../schemas/post_reaction.schema');
const router = require('express').Router();

const postReactionController = container.resolve('postReactionController');

router.use(authenticate);

router.get(
  '/',
  validateSchema(GET_ALL_POST_REACTIONS),
  postReactionController.getAllReactions
);

router.get(
  '/:id',
  validateSchema(GET_POST_REACTION),
  postReactionController.getReactionById
);

router.post(
  '/',
  validateSchema(GIVE_REACTION),
  postReactionController.giveReaction
);

module.exports = router;
