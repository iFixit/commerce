import {
   Button,
   Collapse,
   Flex,
   Tag,
   TagCloseButton,
   TagLabel,
} from '@chakra-ui/react';
import { formatFacetName } from '@helpers/algolia-helpers';
import { useSearchQueryContext } from '@templates/product-list/hooks/useSearchQuery';
import * as React from 'react';
import {
   useClearRefinements,
   useCurrentRefinements,
   usePagination,
} from 'react-instantsearch-hooks-web';

export function CurrentRefinements() {
   const { setSearchQuery } = useSearchQueryContext();
   const currentRefinements = useCurrentRefinements();
   const clearRefinements = useClearRefinements({
      excludedAttributes: [],
   });
   const pagination = usePagination();

   return (
      <Collapse
         in={currentRefinements.items.length > 0}
         animateOpacity
         data-testid="current-refinements"
      >
         <Flex pt="3" wrap="wrap">
            {currentRefinements.items.map((item, index) => {
               return (
                  <React.Fragment key={item.label}>
                     {item.refinements.map((refinement) => {
                        const formattedFacetName = formatFacetName(
                           refinement.attribute
                        );
                        return (
                           <Tag
                              my="1"
                              mr="2"
                              key={refinement.label}
                              variant="subtle"
                              colorScheme="blue"
                              data-testid={`current-refinement-${refinement.value}`}
                           >
                              <TagLabel>
                                 {formattedFacetName}: {refinement.label}
                              </TagLabel>
                              <TagCloseButton
                                 aria-label={`Remove ${formattedFacetName}: ${refinement.label}`}
                                 onClick={() => {
                                    item.refine(refinement);
                                    pagination.refine(0);
                                 }}
                              />
                           </Tag>
                        );
                     })}
                  </React.Fragment>
               );
            })}
            <Button
               onClick={() => {
                  setSearchQuery('');
                  clearRefinements.refine();
               }}
               my="1"
               mr="2"
               size="xs"
               colorScheme="blue"
               variant="outline"
               bgColor="brand.100"
               fontSize="sm"
               fontWeight="normal"
            >
               Clear all filters
            </Button>
         </Flex>
      </Collapse>
   );
}
