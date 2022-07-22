import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionItemProps,
   AccordionPanel,
   Box,
   forwardRef,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { formatFacetName } from '@helpers/algolia-helpers';
import { ProductList } from '@models/product-list';
import * as React from 'react';
import { useHits } from 'react-instantsearch-hooks-web';
import { FacetFilter } from './FacetFilter';
import { useCountRefinements } from './useCountRefinements';
import { useFilteredFacets } from './useFacets';
import { useFilteredRefinementList } from './useFilteredRefinementList';

type FacetsAccordianProps = {
   productList: ProductList;
};

const initialExpandedFacets = ['facet_tags.Item Type'];
let checked = 0;

export function FacetsAccordion({ productList }: FacetsAccordianProps) {
   const facets = useFilteredFacets(productList);
   const countRefinements = useCountRefinements();
   const [indexes, setIndexes] = React.useState<number[]>(() => {
      return initialExpandedFacets
         .map((expandedFacet) =>
            facets.findIndex((facet) => facet === expandedFacet)
         )
         .filter((index) => index >= 0);
   });

   const handleChangeIndexes = React.useCallback((indexes: number[]) => {
      setIndexes(indexes);
   }, []);

   return (
      <Accordion
         allowMultiple
         index={indexes}
         onChange={handleChangeIndexes}
         data-testid="facets-accordion"
         sx={{
            '> .visible': {
               borderTopWidth: '0px',
            },
            '> .visible ~ .visible': {
               borderTopWidth: '1px',
            },
            '>:last-child': {
               borderBottom: 'none',
            },
         }}
      >
         {facets.map((facet, facetIndex) => {
            const facetAttributes = [facet];
            if (facet === 'price_range') {
               facetAttributes.push('facet_tags.Price');
            }
            const refinedCount = countRefinements(facetAttributes);
            return (
               <FacetAccordionItem
                  key={facet}
                  attribute={facet}
                  refinedCount={refinedCount}
                  productList={productList}
                  isExpanded={indexes.includes(facetIndex)}
                  length={facets.length}
               />
            );
         })}
      </Accordion>
   );
}

type FacetAccordionItemProps = AccordionItemProps & {
   attribute: string;
   refinedCount: number;
   productList: ProductList;
   isExpanded: boolean;
   length: number;
};

export const FacetAccordionItem = forwardRef<FacetAccordionItemProps, 'div'>(
   (
      { attribute, refinedCount, productList, isExpanded, length, ...props },
      ref
   ) => {
      const { items } = useFilteredRefinementList({ attribute });
      const { hits } = useHits();
      const isProductListEmpty = hits.length === 0;
      const hasApplicableRefinements = items.length > 0;
      let isDisabled = isProductListEmpty || !hasApplicableRefinements;
      let isHidden = !hasApplicableRefinements && !isProductListEmpty;

      if (isHidden && attribute !== 'worksin') {
         checked += 1;
      }

      if (checked === length) {
         isDisabled = true;
         isHidden = false;
         checked = 0;
      }

      const formattedFacetName = formatFacetName(attribute);
      return (
         <AccordionItem
            ref={ref}
            {...props}
            hidden={isHidden}
            isDisabled={isDisabled}
            data-testid={`${
               isExpanded ? 'expanded' : 'collapsed'
            }-facet-accordion-item-${attribute}`}
            data-facet-name={attribute}
            className={isHidden ? 'hidden' : 'visible'}
         >
            <AccordionButton
               aria-label={
                  isExpanded
                     ? `Collapse ${formattedFacetName}`
                     : `Expand ${formattedFacetName}`
               }
            >
               <Box flex="1" textAlign="left" fontWeight="bold">
                  {formattedFacetName}
               </Box>
               <HStack>
                  {refinedCount > 0 && (
                     <Text
                        rounded="full"
                        bg="gray.600"
                        color="white"
                        px="1.5"
                        fontSize="xs"
                     >
                        {refinedCount}
                     </Text>
                  )}
                  <AccordionIcon />
               </HStack>
            </AccordionButton>
            <AccordionPanel pb={4} display={isDisabled ? 'none' : 'block'}>
               <VStack align="stretch" spacing="3">
                  <FacetFilter
                     attribute={attribute}
                     productList={productList}
                  />
               </VStack>
            </AccordionPanel>
         </AccordionItem>
      );
   }
);
