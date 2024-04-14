/* eslint-disable no-console */
require('dotenv').config();
const { app } = require('./app');
const { PORT } = require('./constants/env.constant');
const {
  validateEnvVariables,
  connectDatabase,
} = require('./helpers/global.helper');

(async function () {
  validateEnvVariables();
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
