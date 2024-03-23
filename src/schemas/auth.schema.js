const { z } = require('zod');
const { BASE_USER } = require('./user.schema');

const REGISTER = z.object({
  body: BASE_USER.shape.body.strict(),
});

const LOGIN = z.object({
  body: BASE_USER.shape.body.pick({
    email: true,
    password: true,
  }),
});

module.exports = {
  REGISTER,
  LOGIN,
};
