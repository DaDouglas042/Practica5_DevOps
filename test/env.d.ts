interface Env {
  p6: D1Database;
}

declare module "cloudflare:test" {
  interface ProvidedEnv extends Env {}
}