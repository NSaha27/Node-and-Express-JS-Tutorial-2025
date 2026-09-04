import { z } from "zod";

const envValdSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65565).default(5000),
  HOST: z.string().min(1).default("localhost"),
  NODE_ENV: z.enum(["development", "production", "test"])
});

export { envValdSchema };
