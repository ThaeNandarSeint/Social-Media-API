const { container } = require('../loaders/container.loader');

const router = require('express').Router();

const userController = container.resolve('userController');

router.get('/', userController.getAllUsers);

module.exports = router;
