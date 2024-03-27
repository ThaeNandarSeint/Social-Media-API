const { z } = require('zod');
const { PARAM_ID } = require('./param_id.schema');
const { BASE_QUERY } = require('./query.schema');

const BASE_POST = z.object({
  body: z.object({
    description: z
      .string()
      .min(2, 'Description must have at least 2 characters.'),
  }),
});

const GET_POST = PARAM_ID;

const GET_ALL_POSTS = BASE_QUERY;

const CREATE_POST = BASE_POST;

const UPDATE_POST = z
  .object({
    body: BASE_POST.shape.body
      .pick({
        description: true,
      })
      .partial(),
  })
  .merge(PARAM_ID);

module.exports = {
  BASE_POST,
  GET_POST,
  GET_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
};
