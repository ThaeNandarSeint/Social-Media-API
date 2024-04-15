const { z } = require('zod');
const { isObjectIdOrHexString } = require('mongoose');
const { CONNECTION_STATUSES } = require('../constants/connection.constant');

const BASE_CONNECTION = z.object({
  body: z.object({
    friend: z.string().refine(isObjectIdOrHexString, 'Invalid Entity ID.'),
  }),
});

const GET_ALL_CONNECTIONS = z.object({
  query: z
    .object({
      status: z.enum([...Object.values(CONNECTION_STATUSES)]),
      user: z.string().refine(isObjectIdOrHexString, 'Invalid Entity ID.'),
      friend: z.string().refine(isObjectIdOrHexString, 'Invalid Entity ID.'),
      sort: z.string().default('-createdAt'),
      skip: z.coerce.number().int().nonnegative().default(0),
      limit: z.coerce.number().int().nonnegative().default(10),
      search: z.string().optional(),
    })
    .partial(),
});

const SEND_FRIEND_REQUEST = BASE_CONNECTION;

module.exports = {
  GET_ALL_CONNECTIONS,
  SEND_FRIEND_REQUEST,
};
