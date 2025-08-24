import { z } from "zod";

/**
 * Defines the schema for environment variables.
 * This schema is used to validate the environment variables at build time,
 * ensuring that the application has the necessary configuration to run.
 * It distinguishes between server-side and client-side variables.
 */
const envSchema = z.object({
  // Define client-side variables prefixed with NEXT_PUBLIC_
  NEXT_PUBLIC_SITE_URL: z.string().url().min(1),
});

/**
 * A typesafe object representing the validated environment variables.
 * If the validation fails, the build process will be halted.
 * This prevents runtime errors caused by missing or invalid environment variables.
 */
export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
