import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),
  trustedOrigins: ["http://localhost:3001"],
  emailAndPassword: {
    enabled: true,
  },
});
