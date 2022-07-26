import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ABSOLUTE_IFIXIT_ORIGIN, RELATIVE_IFIXIT_ORIGIN } from '@config/env';
import { AppProvider } from '@ifixit/app';
import { theme } from '@ifixit/ui';
import Head from 'next/head';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AlgoliaProps, InstantSearchProvider } from './InstantSearchProvider';

const customTheme = extendTheme({
   ...theme,
   sizes: {
      ...theme.sizes,
      header: '68px',
   },
   zIndices: {
      ...theme.zIndices,
      header: 2000,
   },
   styles: {
      ...theme.styles,
      global: {
         ...theme.styles?.global,
         body: {
            // @ts-ignore
            ...theme.styles?.global?.body,
            touchAction: 'pan-x pan-y',
         },
      },
   },
});

const queryClient = new QueryClient();

export type WithProvidersProps<T> = T & { appProps: AppProvidersProps };

export type AppProvidersProps = {
   algolia?: AlgoliaProps;
};

export function AppProviders({
   children,
   algolia,
}: React.PropsWithChildren<AppProvidersProps>) {
   const markup = (
      <>
         <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
               rel="preconnect"
               href="https://fonts.gstatic.com"
               crossOrigin="true"
            />
            <link
               href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Lato:wght@400;700&display=swap"
               rel="stylesheet"
            />

            <link
               rel="prefetch"
               href={`${RELATIVE_IFIXIT_ORIGIN}/api/2.0/user`}
               as="fetch"
            />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
         </Head>
         <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </>
   );

   return (
      <AppProvider
         relativeIfixitOrigin={RELATIVE_IFIXIT_ORIGIN}
         absoluteIfixitOrigin={ABSOLUTE_IFIXIT_ORIGIN}
      >
         <QueryClientProvider client={queryClient}>
            {algolia ? (
               <InstantSearchProvider {...algolia}>
                  {markup}
               </InstantSearchProvider>
            ) : (
               markup
            )}
         </QueryClientProvider>
      </AppProvider>
   );
}
