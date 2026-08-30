import { z } from "zod";

// validate environment variables of a .env file
const envValidationSchema = z.object({
  PORT: z.coerce.number().int().min(3000).max(65535).default(5000),
  HOST: z.string().min(1).default("localhost"),
  NODE_ENV: z.enum(["development", "production", "test"])
});

// validate a user's data
const userValidationSchema = z.object({
  username: z.string().min(1).max(20),
  email: z.email(),
  password: z.string().min(8)
});

export { envValidationSchema, userValidationSchema };
