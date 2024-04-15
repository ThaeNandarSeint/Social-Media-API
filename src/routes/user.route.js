const { upload } = require('../libs/multer');
const { container } = require('../loaders/container.loader');
const { authenticate } = require('../middlewares/authenticate.middleware');
const { validateSchema } = require('../middlewares/validate_schema.middleware');
const { PARAM_ID } = require('../schemas/param_id.schema');
const {
  UPDATE_OWN_PASSWORD,
  GET_USER,
  GET_ALL_USERS,
  UPDATE_USER,
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
  upload.single('avatar'),
  validateSchema(UPDATE_USER),
  userController.updateOwnProfile
);

router.patch(
  '/:id/disable',
  validateSchema(PARAM_ID),
  userController.disableUser
);

router.patch(
  '/:id/enable',
  validateSchema(PARAM_ID),
  userController.enableUser
);

router.delete('/:id', validateSchema(GET_USER), userController.deleteUser);

module.exports = router;
