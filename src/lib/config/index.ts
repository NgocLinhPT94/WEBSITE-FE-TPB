export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1337',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en',

  /**
   * Server-only secrets * (DO NOT expose to client)
   */
  strapiApiToken: process.env.STRAPI_API_TOKEN,
} as const;

export type Env = typeof env;
