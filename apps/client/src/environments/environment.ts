import { z } from 'zod';

const schema = z.object({
  VITE_CLIENT_BASE_URL: z.string().default(''),
  VITE_CLIENT_STORAGE_URL: z.string().default(''),
  VITE_CLIENT_ASSET_URL: z.string().default(''),
});

export const environment = schema.parse(import.meta.env);
