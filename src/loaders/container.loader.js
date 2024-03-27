const awilix = require('awilix');
const path = require('path');

const container = awilix.createContainer();

const getName = (fileName, suffix) => {
  const name = fileName
    .split('.')[0]
    .split('_')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join('')
    .concat('', suffix);

  const result = name.charAt(0).toLowerCase() + name.slice(1);

  return result;
};

const loadControllers = () => {
  container.loadModules(
    [
      [
        path.join(__dirname, '../controllers/**.controller.js'),
        { register: awilix.asFunction },
      ],
    ],
    {
      formatName: (fileName) => getName(fileName, 'Controller'),
    }
  );
};

const loadServices = () => {
  container.loadModules(
    [
      [
        path.join(__dirname, '../services/**.service.js'),
        { register: awilix.asFunction },
      ],
    ],
    {
      formatName: (fileName) => getName(fileName, 'Service'),
    }
  );
};

const loadRepositories = () => {
  container.loadModules(
    [
      [
        path.join(__dirname, '../repositories/**.repository.js'),
        { register: awilix.asFunction },
      ],
    ],
    {
      formatName: (fileName) => getName(fileName, 'Repository'),
    }
  );
};

const loadModels = () => {
  container.loadModules(
    [
      [
        path.join(__dirname, '../models/**.model.js'),
        { register: awilix.asValue },
      ],
    ],
    {
      formatName: (fileName) => getName(fileName, 'Model'),
    }
  );
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
