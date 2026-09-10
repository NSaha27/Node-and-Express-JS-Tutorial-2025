import { z } from "zod";

const EnvValdSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65565).default(5000),
  HOST: z.string().min(1).default("localhost"),
  NODE_ENV: z.enum(["development", "production", "test"])
});

const RegFormValdSchema = z.object({
  username: z.string().min(1).max(20).default("admin"),
  name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(10),
  email: z.email().optional(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
});

const LoginFormValdSchema = z.object({
  username: z.string().min(1).max(20).default("admin"),
  password: z.string().min(8)
});

export { EnvValdSchema, LoginFormValdSchema, RegFormValdSchema };
