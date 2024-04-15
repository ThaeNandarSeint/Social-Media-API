const { z } = require('zod');
const { PARAM_ID } = require('./param_id.schema');
const { BASE_QUERY } = require('./query.schema');
const { isObjectIdOrHexString } = require('mongoose');
const { REACTION_TYPES } = require('../constants/reaction.constant');

const BASE_REACTION = z.object({
  body: z.object({
    post: z.string().refine(isObjectIdOrHexString, 'Invalid Entity ID.'),
    type: z.enum([...Object.values(REACTION_TYPES)]),
  }),
});

const GET_POST_REACTION = PARAM_ID;

const GET_ALL_POST_REACTIONS = z.object({
  query: BASE_QUERY.shape.query.merge(
    z
      .object({
        actor: z.string().refine(isObjectIdOrHexString, 'Invalid Entity ID.'),
        post: z.string().refine(isObjectIdOrHexString, 'Invalid Entity ID.'),
        type: z.enum([...Object.values(REACTION_TYPES)]),
      })
      .partial()
  ),
});

const GIVE_REACTION = BASE_REACTION;

module.exports = {
  GET_POST_REACTION,
  GET_ALL_POST_REACTIONS,
  GIVE_REACTION,
};
