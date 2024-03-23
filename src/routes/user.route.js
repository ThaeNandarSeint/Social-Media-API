const { container } = require('../loaders/container.loader');
const { authenticate } = require('../middlewares/authenticate.middleware');
const { validateSchema } = require('../middlewares/validate_schema.middleware');
const { UPDATE_OWN_PASSWORD } = require('../schemas/user.schema');

const router = require('express').Router();

const userController = container.resolve('userController');

router.get('/', authenticate, userController.getAllUsers);

router.get('/me', authenticate, userController.getMyInfo);

router.patch(
  '/me/password',
  authenticate,
  validateSchema(UPDATE_OWN_PASSWORD),
  userController.updateOwnPassword
);

module.exports = router;
