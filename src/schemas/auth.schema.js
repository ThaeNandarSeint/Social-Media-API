const { z } = require('zod');
const { BASE_USER } = require('./user.schema');

const REGISTER_USER = z.object({
  body: BASE_USER.shape.body.strict(),
});

module.exports = {
  REGISTER_USER,
};
