import {z} from "zod";

const env = z
  .object({
    PORT: z.string().default("8080"),
    HOST: z.string().default("localhost"),
    NODE_ENV: z.string().default("production"),
    SESSION_SECRET_KEY: z.string(),
    JWT_SECRET_KEY: z.string(),
    DB_CONNECTING_STRING: z.string().default("mongodb://localhost:27017"),
    DB_NAME: z.string()
  })
  .parse(process.env);

export default env;