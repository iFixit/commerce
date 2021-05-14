import { Box, chakra, Flex, HStack } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';

export type DefaultLayoutProps = {
   title: string;
};

export function DefaultLayout({
   children,
   title,
}: React.PropsWithChildren<DefaultLayoutProps>) {
   return (
      <Box>
         <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Flex direction="column">
            <Flex bg="gray.900" color="white" height="68px">
               <Flex alignItems="center" pl={6}>
                  <Link href="/" passHref>
                     <chakra.a cursor="pointer">
                        <IFixitLogo />
                     </chakra.a>
                  </Link>
                  <HStack ml={6}>
                     <Link href="#">
                        <chakra.a px={3}>Guides</chakra.a>
                     </Link>
                     <Link href="#">
                        <chakra.a px={3}>Answers</chakra.a>
                     </Link>
                  </HStack>
               </Flex>
            </Flex>
            {children}
         </Flex>
      </Box>
   );
}

type IFixitLogoProps = {
   className?: string;
};

const IFixitLogo = chakra(({ className }: IFixitLogoProps) => (
   <svg width="118" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
         d="M108.185 13.14h-3.6c-.949 0-1.727-.787-1.727-1.746 0-.958.778-1.745 1.727-1.745h10.945c.949 0 1.727.787 1.727 1.745 0 .96-.778 1.746-1.727 1.746h-3.6v11.974a1.869 1.869 0 01-1.873 1.894 1.868 1.868 0 01-1.872-1.894V13.14zM96.218 11.394c0-1.057.827-1.893 1.873-1.893 1.045 0 1.872.836 1.872 1.893v13.72a1.869 1.869 0 01-1.872 1.894 1.869 1.869 0 01-1.873-1.894v-13.72zM86.768 18.356l5.334-5.393a1.944 1.944 0 000-2.728 1.894 1.894 0 00-2.7 0l-5.334 5.392-5.334-5.392a1.894 1.894 0 00-2.699 0 1.944 1.944 0 000 2.728l5.334 5.393-5.334 5.392a1.944 1.944 0 000 2.728 1.892 1.892 0 002.7 0l5.334-5.392 5.334 5.392a1.892 1.892 0 002.699 0 1.945 1.945 0 000-2.728l-5.334-5.392zM68.174 11.394c0-1.057.827-1.893 1.872-1.893 1.046 0 1.873.836 1.873 1.893v13.72a1.869 1.869 0 01-1.873 1.894 1.868 1.868 0 01-1.872-1.894v-13.72zM52.047 11.542c0-1.057.828-1.893 1.874-1.893h9.534c.949 0 1.703.762 1.703 1.72 0 .96-.754 1.722-1.703 1.722h-7.662v3.663h6.568c.948 0 1.702.763 1.702 1.721a1.7 1.7 0 01-1.702 1.722h-6.568v4.917a1.869 1.869 0 01-1.872 1.894 1.869 1.869 0 01-1.874-1.894V11.542zM44.046 11.394c0-1.057.827-1.893 1.872-1.893 1.046 0 1.873.836 1.873 1.893v13.72a1.868 1.868 0 01-1.873 1.894 1.868 1.868 0 01-1.872-1.894v-13.72z"
         fill="#fff"
      ></path>
      <path
         d="M22.768 18.758l3.52 4.698c.293.39.31 1.038.037 1.443l-.178.264c-.27.403-.816.964-1.21 1.246l-.423.301c-.394.282-1.032.272-1.416-.024l-4.65-3.563c-.384-.295-1.014-.295-1.399 0l-4.65 3.563c-.384.296-1.025.31-1.422.034l-.307-.213a5.89 5.89 0 01-1.226-1.232l-.265-.384c-.276-.4-.264-1.045.026-1.435l3.525-4.7c.291-.39.291-1.027 0-1.416l-3.525-4.702c-.29-.39-.301-1.034-.023-1.433l.3-.428c.277-.399.832-.95 1.231-1.223l.262-.18c.399-.275 1.04-.257 1.425.037l4.65 3.563c.384.295 1.014.295 1.398 0l4.65-3.563c.384-.294 1.038-.333 1.455-.085l.487.29c.416.248.948.801 1.182 1.228l.172.313c.233.426.187 1.094-.105 1.484l-3.52 4.7c-.293.39-.293 1.028 0 1.417zM17.806 0C7.972 0 0 8.059 0 17.999 0 27.94 7.972 36 17.806 36s17.806-8.06 17.806-18.001C35.612 8.059 27.64 0 17.806 0z"
         fill="#1975F1"
      ></path>
   </svg>
));
