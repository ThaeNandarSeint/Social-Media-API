const { z } = require('zod');

const envSchema = z.object({
  PORT: z.coerce.number().optional(),
  NODE_ENV: z.enum(['local', 'development', 'production'], {
    required_error: 'NODE_ENV is missing.',
  }),
  MONGODB_URL: z.string({
    required_error: 'MONGODB_URL is missing.',
  }),
  DATABASE_NAME: z.string({
    required_error: 'DATABASE_NAME is missing.',
  }),
});

module.exports = { envSchema };
