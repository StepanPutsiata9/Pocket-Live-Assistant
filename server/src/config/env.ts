import { z } from 'zod';

const envSchema = z.object({
  MONGO_URI: z.string().url({ message: 'MONGO_URI must be a valid URL' }),
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  FIREBASE_SERVICE_ACCOUNT_BASE64: z
    .string()
    .min(1, { message: 'FIREBASE_SERVICE_ACCOUNT_BASE64 is required' }),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('Invalid environment variables:', result.error);
  process.exit(1);
}

export default result.data;
