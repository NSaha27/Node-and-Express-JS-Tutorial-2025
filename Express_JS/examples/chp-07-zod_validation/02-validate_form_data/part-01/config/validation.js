import { z } from "zod";

const EnvFileValdSchema = z.object({
  PORT: z.coerce.number().min(1).max(65535).default(5000),
  HOST: z.string().min(1).default("localhost"),
  NODE_ENV: z.enum(["development", "production", "test"])
});

const UserFormValdSchema = z.object({
  username: z.string().min(1).max(20).uppercase().default("ADMIN"),
  name: z.string().min(1),
  address: z.string().optional(),
  phone: z.string().min(10),
  email: z.email(),
  password: z.string().min(8)
});

export { EnvFileValdSchema, UserFormValdSchema };
