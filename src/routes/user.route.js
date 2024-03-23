const { container } = require('../loaders/container.loader');
const { authenticate } = require('../middlewares/authenticate.middleware');

const router = require('express').Router();

const userController = container.resolve('userController');

router.get('/', authenticate, userController.getAllUsers);

module.exports = router;
