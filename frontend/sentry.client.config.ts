// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { BrowserTracing } from '@sentry/tracing';

const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_FORCE_CLIENT_SAMPLING =
   process.env.SENTRY_FORCE_CLIENT_SAMPLING === 'true';

Sentry.init({
   dsn: SENTRY_DSN,
   integrations: [new BrowserTracing()],
   sampleRate: SENTRY_FORCE_CLIENT_SAMPLING ? 0.05 : 1.0,
   normalizeDepth: 5,
   tracesSampleRate: 0.005,
   // ...
   // Note: if you want to override the automatic release value, do not set a
   // `release` value here - use the environment variable `SENTRY_RELEASE`, so
   // that it will also get attached to your source maps
   initialScope: {
      tags: {
         'next.runtime': 'client',
      },
   },
   ignoreErrors: [
      'TypeError: NetworkError when attempting to fetch resource.',
      'TypeError: Network request failed',
      // Algolia error when network requests fail.
      // Only happens on iOS devices (across all browsers)
      'RetryError: Unreachable hosts - your application id may be incorrect',
      // Can't reproduce, promise rejection with an instance of a CustomEvent
      // is unhandled.
      // Only happens on Macs, mostly Chrome, but some on safari
      'CustomEvent: Non-Error promise rejection captured with keys: currentTarget, detail, isTrusted, target',
   ],
});
