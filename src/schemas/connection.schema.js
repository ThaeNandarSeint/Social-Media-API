const { z } = require('zod');
const { isObjectIdOrHexString } = require('mongoose');
const { CONNECTION_STATUSES } = require('../constants/connection.constant');
const { BASE_QUERY } = require('./query.schema');

const BASE_CONNECTION = z.object({
  body: z.object({
    friend: z.string().refine(isObjectIdOrHexString, 'Invalid Entity ID.'),
  }),
});

const GET_ALL_CONNECTIONS = z.object({
  query: BASE_QUERY.shape.query.merge(
    z
      .object({
        status: z.enum([...Object.values(CONNECTION_STATUSES)]),
        user: z.string().refine(isObjectIdOrHexString, 'Invalid Entity ID.'),
        friend: z.string().refine(isObjectIdOrHexString, 'Invalid Entity ID.'),
      })
      .partial()
  ),
});

const SEND_FRIEND_REQUEST = BASE_CONNECTION;

module.exports = {
  GET_ALL_CONNECTIONS,
  SEND_FRIEND_REQUEST,
};
