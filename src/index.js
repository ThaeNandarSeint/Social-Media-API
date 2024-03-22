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

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    console.log('UnhandledRejection occurred.');
    console.log(err);
    server.close(() => {
      process.exit(1);
    });
  });
})();
