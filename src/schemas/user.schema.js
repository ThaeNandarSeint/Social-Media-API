const { z } = require('zod');
const { PARAM_ID } = require('./param_id.schema');
const { BASE_QUERY } = require('./query.schema');

const BASE_USER = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must have at least 2 characters.')
      .max(50, 'Name can only have 50 characters at most.'),
    email: z.string().email('Invalid email.'),
    password: z
      .string()
      .min(8, 'Password must have at least 8 characters.')
      .max(16, 'Password exceeds a maximum of 16 characters.'),
  }),
});

const UPDATE_OWN_PASSWORD = z.object({
  body: z.object({
    oldPassword: z
      .string()
      .min(8, 'Password must have at least 8 characters.')
      .max(16, 'Password exceeds a maximum of 16 characters.'),
    password: z
      .string()
      .min(8, 'Password must have at least 8 characters.')
      .max(16, 'Password exceeds a maximum of 16 characters.'),
  }),
});

const GET_USER = PARAM_ID;

const GET_ALL_USERS = BASE_QUERY;

const UPDATE_USER = z.object({
  body: BASE_USER.shape.body
    .pick({
      name: true,
    })
    .partial(),
});

module.exports = {
  BASE_USER,
  UPDATE_OWN_PASSWORD,
  GET_USER,
  GET_ALL_USERS,
  UPDATE_USER,
};
