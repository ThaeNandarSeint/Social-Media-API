const { container } = require('../loaders/container.loader');
const { validateSchema } = require('../middlewares/validate_schema.middleware');
const { REGISTER, LOGIN } = require('../schemas/auth.schema');

const router = require('express').Router();

const authController = container.resolve('authController');

router.post('/register', validateSchema(REGISTER), authController.register);

router.post('/login', validateSchema(LOGIN), authController.login);

module.exports = router;
