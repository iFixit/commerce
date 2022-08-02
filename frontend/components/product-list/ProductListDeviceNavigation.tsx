import { Flex, FlexProps } from '@chakra-ui/react';
import { SecondaryNavbarItem, SecondaryNavbarLink } from '@components/common';
import { IFIXIT_ORIGIN } from '@config/env';
import { ProductList } from '@models/product-list';
import NextLink from 'next/link';

type ProductListDeviceNavigationProps = FlexProps & {
   productList: ProductList;
};

export function ProductListDeviceNavigation({
   productList,
   ...flexProps
}: ProductListDeviceNavigationProps) {
   const isRootProductList = productList.ancestors.length === 0;
   let guideUrl: string | undefined;
   let answersUrl: string | undefined;
   if (isRootProductList) {
      guideUrl = `${IFIXIT_ORIGIN}/Guide`;
      answersUrl = `${IFIXIT_ORIGIN}/Answers`;
   } else if (productList.deviceTitle && productList.deviceTitle.length > 0) {
      const deviceHandle = productList.deviceTitle.replace(/\s+/g, '_');
      guideUrl = `${IFIXIT_ORIGIN}/Device/${deviceHandle}`;
      answersUrl = `${IFIXIT_ORIGIN}/Answers/Device/${deviceHandle}`;
   }

   if (guideUrl == null || answersUrl == null) {
      return null;
   }

   return (
      <Flex
         h="full"
         align="stretch"
         borderLeftWidth={{
            base: '0',
            sm: '1px',
            md: '0',
         }}
         bg="white"
         {...flexProps}
      >
         <SecondaryNavbarItem isCurrent>Parts</SecondaryNavbarItem>
         <SecondaryNavbarItem>
            <NextLink href={guideUrl} passHref>
               <SecondaryNavbarLink>Guides</SecondaryNavbarLink>
            </NextLink>
         </SecondaryNavbarItem>
         <SecondaryNavbarItem>
            <NextLink href={answersUrl} passHref>
               <SecondaryNavbarLink>Answers</SecondaryNavbarLink>
            </NextLink>
         </SecondaryNavbarItem>
      </Flex>
   );
}
