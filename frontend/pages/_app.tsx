import { AppProviders } from '@components/common';
import { POLYFILL_DOMAIN } from '@config/env';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ServerSidePropsProvider } from '@lib/server-side-props';
import { AppProps } from 'next/app';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';
import { applySentryFetchMiddleware } from '@ifixit/sentry';
import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
// Improve FontAwesome integration with Next.js https://fontawesome.com/v5/docs/web/use-with/react#next-js
config.autoAddCss = false;
applySentryFetchMiddleware();

type AppPropsWithLayout<P> = AppProps<P> & {
   Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout<any>) {
   const [mswState, setMswState] = useState<'unused' | 'loading' | 'ready'>(
      'unused'
   );

   if (process.env.NEXT_PUBLIC_MOCK_API === 'true' && mswState === 'unused') {
      setMswState('loading');
      import('@tests/playwright/msw')
         .then(({ setupMocks }) => {
            setupMocks();
         })
         .then(() => setMswState('ready'));
   }

   if (mswState === 'loading') {
      return <div>Loading MSW Worker...</div>;
   }

   const getLayout = Component.getLayout ?? ((page) => page);
   const polyfillDomain = POLYFILL_DOMAIN ?? 'https://polyfill.io';
   return (
      <>
         <Script
            src={`${polyfillDomain}/v3/polyfill.min.js?features=default,Intl.RelativeTimeFormat,Intl.RelativeTimeFormat.~locale.en,Object.fromEntries,ResizeObserver`}
            strategy="beforeInteractive"
         />
         <ServerSidePropsProvider props={pageProps}>
            <AppProviders {...pageProps.appProps}>
               <NextNProgress showOnShallow={false} />
               {getLayout(<Component {...pageProps} />, pageProps)}
            </AppProviders>
         </ServerSidePropsProvider>
         <Analytics />
      </>
   );
}

export default MyApp;
