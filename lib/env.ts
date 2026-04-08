const nodeEnv = process.env.NODE_ENV ?? "development";
const isProduction = nodeEnv === "production";
const isDevelopment = nodeEnv === "development";

export const env = {
  nodeEnv,
  isProduction,
  isDevelopment,
  databaseUrl: process.env.DATABASE_URL ?? "",
  directUrl: process.env.DIRECT_URL ?? "",
  authSecret: process.env.AUTH_SECRET ?? "",
  googleEnabled: Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
  githubEnabled: Boolean(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET),
  demoAuthEnabled: process.env.DEMO_AUTH_ENABLED
    ? process.env.DEMO_AUTH_ENABLED === "true"
    : !isProduction
};

if (!env.databaseUrl) {
  throw new Error("DATABASE_URL is required.");
}

if (isProduction && !env.authSecret) {
  throw new Error("AUTH_SECRET is required in production.");
}
