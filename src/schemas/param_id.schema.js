const { isObjectIdOrHexString } = require('mongoose');
const { z } = require('zod');

const PARAM_ID = z.object({
  params: z.object({
    id: z.string().refine(isObjectIdOrHexString, 'Invalid Entity ID.'),
  }),
});

module.exports = { PARAM_ID };
