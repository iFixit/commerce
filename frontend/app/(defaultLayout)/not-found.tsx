'use client';

import { Center, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import { AppProviders } from '@components/common/AppProviders';
import { DEFAULT_STORE_CODE } from '@config/env';
import { getLayoutServerSideProps } from '@layouts/default/server';
import IFixitPageFrame from './components/IFixitPageFrame';

export default async function NotFound() {
   const layoutPropsPromise = getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });

   const layoutProps = await layoutPropsPromise;

   return (
      <AppProviders>
         <IFixitPageFrame {...layoutProps}>
            <Center
               flexGrow={1}
               paddingTop="16px"
               paddingBottom="60px"
               paddingLeft="20px"
               paddingRight="20px"
            >
               <VStack>
                  <Heading
                     as="h2"
                     fontSize={{ base: '4xl', md: '5xl' }}
                     fontWeight="medium"
                  >
                     404
                  </Heading>
                  <Text fontWeight="medium" pb="3" textTransform="uppercase">
                     Page not found
                  </Text>
                  <Divider
                     borderWidth="1px"
                     borderColor="red.500"
                     width="50px"
                  />
                  <Text
                     pt="3"
                     overflowWrap="break-word"
                     align="center"
                     maxW="360px"
                  >
                     We can&apos;t find the page you&apos;re looking for.
                     Whoops.
                  </Text>
               </VStack>
            </Center>
         </IFixitPageFrame>
      </AppProviders>
   );
}