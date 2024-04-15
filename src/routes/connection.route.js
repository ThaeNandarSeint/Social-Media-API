const { container } = require('../loaders/container.loader');
const { authenticate } = require('../middlewares/authenticate.middleware');
const { validateSchema } = require('../middlewares/validate_schema.middleware');
const {
  GET_ALL_CONNECTIONS,
  SEND_FRIEND_REQUEST,
} = require('../schemas/connection.schema');
const { PARAM_ID } = require('../schemas/param_id.schema');

const router = require('express').Router();

const connectionController = container.resolve('connectionController');

router.use(authenticate);

router.get(
  '/',
  validateSchema(GET_ALL_CONNECTIONS),
  connectionController.getAllConnections
);

router.get(
  '/:id',
  validateSchema(PARAM_ID),
  connectionController.getConnectionById
);

router.post(
  '/',
  validateSchema(SEND_FRIEND_REQUEST),
  connectionController.sendFriendRequest
);

router.patch(
  '/:id/accept',
  validateSchema(PARAM_ID),
  connectionController.acceptFriendRequest
);

router.patch(
  '/:id/reject',
  validateSchema(PARAM_ID),
  connectionController.rejectFriendRequest
);

module.exports = router;
