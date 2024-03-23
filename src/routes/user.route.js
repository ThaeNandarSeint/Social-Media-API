const { container } = require('../loaders/container.loader');
const { authenticate } = require('../middlewares/authenticate.middleware');
const { validateSchema } = require('../middlewares/validate_schema.middleware');
const {
  UPDATE_OWN_PASSWORD,
  GET_USER,
  GET_ALL_USERS,
  UPDATE_OWN_PROFILE,
} = require('../schemas/user.schema');

const router = require('express').Router();

const userController = container.resolve('userController');

router.use(authenticate);

router.get('/', validateSchema(GET_ALL_USERS), userController.getAllUsers);

router.get('/me', userController.getMyInfo);

router.get('/:id', validateSchema(GET_USER), userController.getUserById);

router.patch(
  '/me/password',
  validateSchema(UPDATE_OWN_PASSWORD),
  userController.updateOwnPassword
);

router.patch(
  '/me',
  validateSchema(UPDATE_OWN_PROFILE),
  userController.updateOwnProfile
);

module.exports = router;
