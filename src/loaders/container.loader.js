const awilix = require('awilix');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

const userService = require('../services/user.service');
const authService = require('../services/auth.service');

const userRepository = require('../repositories/user.repository');

const userModel = require('../models/user.model');

const container = awilix.createContainer();

const loadControllers = () => {
  const controllers = {
    userController: awilix.asFunction(userController),
    authController: awilix.asFunction(authController),
  };

  container.register(controllers);
};

const loadServices = () => {
  const services = {
    userService: awilix.asFunction(userService),
    authService: awilix.asFunction(authService),
  };

  container.register(services);
};

const loadRepositories = () => {
  const repositories = {
    userRepository: awilix.asFunction(userRepository),
  };

  container.register(repositories);
};

const loadModels = () => {
  const models = {
    userModel: awilix.asValue(userModel),
  };

  container.register(models);
};

const loadContainer = () => {
  loadModels();
  loadRepositories();
  loadServices();
  loadControllers();
};

module.exports = {
  loadContainer,
  container,
};