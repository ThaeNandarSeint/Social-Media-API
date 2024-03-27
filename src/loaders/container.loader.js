const awilix = require('awilix');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const postController = require('../controllers/post.controller');

const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const postService = require('../services/post.service');

const userRepository = require('../repositories/user.repository');
const postRepository = require('../repositories/post.repository');

const userModel = require('../models/user.model');
const postModel = require('../models/post.model');

const container = awilix.createContainer();

const loadControllers = () => {
  const controllers = {
    userController: awilix.asFunction(userController),
    authController: awilix.asFunction(authController),
    postController: awilix.asFunction(postController),
  };

  container.register(controllers);
};

const loadServices = () => {
  const services = {
    userService: awilix.asFunction(userService),
    authService: awilix.asFunction(authService),
    postService: awilix.asFunction(postService),
  };

  container.register(services);
};

const loadRepositories = () => {
  const repositories = {
    userRepository: awilix.asFunction(userRepository),
    postRepository: awilix.asFunction(postRepository),
  };

  container.register(repositories);
};

const loadModels = () => {
  const models = {
    userModel: awilix.asValue(userModel),
    postModel: awilix.asValue(postModel),
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
