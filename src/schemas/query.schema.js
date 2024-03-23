const { z } = require('zod');

const BASE_QUERY = z.object({
  query: z
    .object({
      sort: z.string().default('-createdAt'),
      skip: z.coerce.number().int().nonnegative().default(0),
      limit: z.coerce.number().int().nonnegative().default(10),
      search: z.string().optional(),
    })
    .strict(),
});

module.exports = { BASE_QUERY };
