import { Button, Link, Box } from '@chakra-ui/react';
import { useCallback } from 'react';
import {
   BuyBoxResponse,
   BuyBoxVariant,
} from '@lib/ifixit-api/international-buy-box';
import { Flag, FlagCountryCode } from '@ifixit/icons';
import { trackInMatomoAndGA } from '@ifixit/analytics';

type InternationalBuyBoxProps = {
   store: BuyBoxResponse;
   selectedVariant: BuyBoxVariant;
   dismissBuyBox: () => void;
};

export function InternationalBuyBox({
   store,
   selectedVariant,
   dismissBuyBox,
}: InternationalBuyBoxProps) {
   const trackClick = useCallback(() => {
      const category = `${store.salesChannel} Store Buy Box`;
      trackInMatomoAndGA({
         eventCategory: category,
         eventAction: `${category} - Click - ${selectedVariant.gaSku}`,
      });
   }, [selectedVariant, store]);
   return (
      <Box textAlign="center">
         <Button
            mt={3}
            variant="outline"
            as="a"
            w="full"
            colorScheme="brand"
            onClick={trackClick}
            href={selectedVariant?.productURL}
         >
            <Flag mr={3} w={7} code={store.countryCode as FlagCountryCode} />{' '}
            Buy from our Store in {store.storeName}
         </Button>
         <Box m={2}>or</Box>
         <Link color="brand.600" fontSize="md" onClick={dismissBuyBox}>
            Buy from our US Store
         </Link>
      </Box>
   );
}
