export const ALGOLIA_APP_ID = requireEnvVariable(
   process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
   'NEXT_PUBLIC_ALGOLIA_APP_ID'
);

export const ALGOLIA_API_KEY = requireEnvVariable(
   process.env.ALGOLIA_API_KEY,
   'ALGOLIA_API_KEY'
);

export const IFIXIT_ORIGIN = requireEnvVariable(
   process.env.NEXT_PUBLIC_IFIXIT_ORIGIN,
   'NEXT_PUBLIC_IFIXIT_ORIGIN'
);

export const APP_ORIGIN = requireEnvVariable(
   process.env.NEXT_PUBLIC_APP_ORIGIN,
   'NEXT_PUBLIC_APP_ORIGIN'
);

export const STRAPI_ORIGIN = requireEnvVariable(
   process.env.NEXT_PUBLIC_STRAPI_ORIGIN,
   'NEXT_PUBLIC_STRAPI_ORIGIN'
);

export const STATSD_HOST = process.env.STATSD_HOST;

export const PIXEL_PING_URL = process.env.NEXT_PUBLIC_PIXEL_PING_URL;

export const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;

export const GA_URL = process.env.NEXT_PUBLIC_GA_URL;

export const GA_KEY = process.env.NEXT_PUBLIC_GA_KEY;

export const GA_DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG;

export const ALGOLIA_PRODUCT_INDEX_NAME = requireEnvVariable(
   process.env.NEXT_PUBLIC_ALGOLIA_PRODUCT_INDEX_NAME,
   'NEXT_PUBLIC_ALGOLIA_PRODUCT_INDEX_NAME'
);

export const SHOPIFY_STOREFRONT_VERSION = requireEnvVariable(
   process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_VERSION,
   'NEXT_PUBLIC_SHOPIFY_STOREFRONT_VERSION'
);

export const DEFAULT_STORE_CODE = requireEnvVariable(
   process.env.NEXT_PUBLIC_DEFAULT_STORE_CODE,
   'NEXT_PUBLIC_DEFAULT_STORE_CODE'
);

export const POLYFILL_DOMAIN = process.env.NEXT_PUBLIC_POLYFILL_DOMAIN;

export const CACHE_DISABLED = process.env.NEXT_PUBLIC_CACHE_DISABLED === 'true';

export const REDIS_URL = process.env.REDIS_URL;

export const COLORLESS_LOGS = process.env.COLORLESS_LOGS;

function requireEnvVariable(
   env: string | null | undefined,
   envName: string
): string {
   if (env == null) {
      if (process.browser) {
         if (envName.startsWith('NEXT_PUBLIC')) {
            console.warn(`environment variable "${envName}" is not defined`);
         }
         return env as any;
      }
      throw new Error(`environment variable "${envName}" is not defined`);
   }
   return env;
}
