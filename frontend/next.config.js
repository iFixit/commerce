const withTM = require('next-transpile-modules')([
   '@ifixit/ui',
   '@ifixit/icons',
   '@ifixit/auth-sdk',
   '@ifixit/newsletter-sdk',
   '@ifixit/helpers',
]);

const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
   // Additional config options for the Sentry Webpack plugin. Keep in mind that
   // the following options are set automatically, and overriding them is not
   // recommended:
   //   release, url, org, project, authToken, configFile, stripPrefix,
   //   urlPrefix, include, ignore

   silent: true, // Suppresses all logs
   // For all available options, see:
   // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const moduleExports = {
   env: {
      ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
      NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      NEXT_PUBLIC_IFIXIT_ORIGIN: process.env.NEXT_PUBLIC_IFIXIT_ORIGIN,
      NEXT_PUBLIC_STRAPI_ORIGIN: process.env.NEXT_PUBLIC_STRAPI_ORIGIN,
   },
   async rewrites() {
      return [
         {
            source: '/uploads/:name',
            destination: `${process.env.NEXT_PUBLIC_STRAPI_ORIGIN}/uploads/:name`,
         },
      ];
   },
   async redirects() {
      return [
         {
            source: '/Store/Guide/:guideid',
            destination: `${process.env.NEXT_PUBLIC_IFIXIT_ORIGIN}/Guide/_/:guideid`,
            permanent: true,
         },
      ];
   },
   images: {
      domains: [
         'localhost',
         'cdn.shopify.com',
         'strapi.cominor.com',
         'valkyrie.cdn.ifixit.com',
         'cart-products.cdn.ifixit.com',
         'assets.cdn.ifixit.com',
         'www.cominor.com',
         'guide-images.cdn.ifixit.com',
         process.env.STRAPI_IMAGE_DOMAIN,
      ].filter((domain) => domain),
   },
   i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
   },
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(
   withTM(moduleExports),
   sentryWebpackPluginOptions
);
