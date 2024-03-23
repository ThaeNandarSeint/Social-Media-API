const { container } = require('../loaders/container.loader');
const { validateSchema } = require('../middlewares/validate_schema.middleware');
const { REGISTER_USER } = require('../schemas/auth.schema');

const router = require('express').Router();

const authController = container.resolve('authController');

router.post(
  '/register',
  validateSchema(REGISTER_USER),
  authController.register
);

module.exports = router;
