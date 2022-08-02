import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { IFIXIT_ORIGIN } from '@config/env';
import { AppProvider } from '@ifixit/app';
import { theme } from '@ifixit/ui';
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
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
   );

   return (
      <AppProvider ifixitOrigin={IFIXIT_ORIGIN}>
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
