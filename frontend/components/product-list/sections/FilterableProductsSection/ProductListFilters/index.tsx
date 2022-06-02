import { Box, chakra, Spinner } from '@chakra-ui/react';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { Facet, useFacets, useIsSearching } from '@lib/algolia';
import { ProductList } from '@models/product-list';
import { WikiInfoEntry } from '@models/product-list/types';
import { assign } from '@xstate/fsm';
import { useMachine } from '@xstate/react/fsm';
import produce from 'immer';
import React from 'react';
import isEqual from 'react-fast-compare';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import { FilterRow, ItemData, TOGGLE_ANIMATION_DURATION_MS } from './FilterRow';
import { useVirtualAccordionMachine } from './virtualAccordion.machine';

interface FilterListProps {
   className?: string;
   productList: ProductList;
}

const FACET_BLOCKLIST = [
   'tags',
   'vendor',
   'collections',
   'option_names',
   'collection_ids',
   'named_tags_names',
   'named_tags.worksin',
   'facet_tags.Price',
   'inventory_management',
   'quantity_available',
   'category',
   'facet_tags.Main Category',
];

const Sizer = chakra(AutoSizer);

const DEFAULT_ROW_HEIGHT = 41;

export const ProductListFilters = chakra((props: FilterListProps) => {
   const { className, productList } = props;
   const listRef = React.useRef<VariableSizeList>(null);
   const { facets, areRefined } = useFilteredFacets(productList.wikiInfo);
   const isSearching = useIsSearching();

   const machine = useVirtualAccordionMachine({
      items: facets,
      areRefined,
      sizeMap: {},
      expandedItemsIds: [],
      toggledItemId: undefined,
      toggledItemDelta: undefined,
   });
   const [state, send] = useMachine(machine, {
      actions: {
         setItemSize: assign((ctx, event) => {
            return produce(ctx, (draft) => {
               if (event.type === 'ITEM_SIZE_UPDATED') {
                  const index = draft.items.findIndex(
                     (i) => i.handle === event.id
                  );
                  if (index >= 0) {
                     if (event.id === draft.toggledItemId) {
                        draft.toggledItemDelta =
                           draft.sizeMap[event.id] - event.size;
                     }
                     draft.sizeMap[event.id] = event.size;
                     if (listRef.current) {
                        if (draft.shouldResetSizeMap) {
                           listRef.current.resetAfterIndex(0);
                           draft.shouldResetSizeMap = false;
                        } else {
                           listRef.current.resetAfterIndex(index);
                        }
                     }
                  }
               }
            });
         }),
         setItems: assign((ctx, event) => {
            return produce(ctx, (draft) => {
               if (event.type === 'ITEMS_CHANGED') {
                  draft.items = event.items;
                  draft.shouldResetSizeMap = true;
               }
            });
         }),
         toggleItem: assign((ctx, event) => {
            return produce(ctx, (draft) => {
               if (event.type === 'TOGGLE_ITEM') {
                  if (draft.expandedItemsIds.includes(event.id)) {
                     draft.expandedItemsIds = draft.expandedItemsIds.filter(
                        (id) => id !== event.id
                     );
                  } else {
                     draft.expandedItemsIds.push(event.id);
                  }
                  draft.toggledItemId = event.id;
               }
            });
         }),
      },
   });

   React.useEffect(() => {
      if (state.value === 'toggleItemAnimation') {
         const timeoutId = setTimeout(() => {
            send({
               type: 'TOGGLE_ITEM_ANIMATION_END',
            });
         }, TOGGLE_ANIMATION_DURATION_MS);
         return () => {
            clearTimeout(timeoutId);
         };
      }
   }, [send, state.value]);

   React.useEffect(() => {
      if (!isEqual(state.context.items, facets)) {
         send({
            type: 'ITEMS_CHANGED',
            items: facets,
            areRefined,
         });
      }
   }, [areRefined, facets, send, state.context.items]);

   const data = React.useMemo<ItemData>(() => {
      return [state, send];
   }, [state, send]);

   const getSize = React.useCallback(
      (index: number): number => {
         return (
            state.context.sizeMap[state.context.items[index].handle] ||
            DEFAULT_ROW_HEIGHT
         );
      },
      [state.context.items, state.context.sizeMap]
   );

   return (
      <Sizer className={className}>
         {({ height, width }) => {
            return (
               <>
                  <Box
                     opacity={isSearching ? 0.0 : 1}
                     transition="opacity 100ms"
                  >
                     <VariableSizeList
                        ref={listRef}
                        height={height}
                        itemCount={state.context.items.length}
                        itemKey={itemKey}
                        itemSize={getSize}
                        estimatedItemSize={DEFAULT_ROW_HEIGHT}
                        width={width}
                        itemData={data}
                     >
                        {FilterRow}
                     </VariableSizeList>
                  </Box>
                  {isSearching && (
                     <Box
                        position="absolute"
                        display="block"
                        top="50%"
                        left={width / 2}
                        transform="translateX(-50%)"
                     >
                        <Spinner color="brand.400" />
                     </Box>
                  )}
               </>
            );
         }}
      </Sizer>
   );
});

function itemKey(index: number, data: ItemData): string {
   const [state] = data;
   const item = state.context.items[index];
   return item.name;
}

function useFilteredFacets(wikiInfo: WikiInfoEntry[]) {
   const user = useAuthenticatedUser();
   const isProUser = user.data?.discountTier != null;
   const facets = useFacets();
   const infoNames = React.useMemo(
      () => new Set(wikiInfo.map((info) => `facet_tags.${info.name}`)),
      [wikiInfo]
   );
   const sortedFacets = React.useMemo(() => {
      return facets.slice().sort((a, b) => a.name.localeCompare(b.name));
   }, [facets]);
   const usefulFacets = React.useMemo(() => {
      const facets = sortedFacets
         .filter(isUsefulFacet)
         .filter((facet) => !infoNames.has(facet.algoliaName));
      return isProUser ? facets.filter(isAvailableToProUsers) : facets;
   }, [sortedFacets, isProUser, wikiInfo]);
   const refinedFacets = React.useMemo(() => {
      return usefulFacets.filter(hasMatchingOptions);
   }, [usefulFacets]);
   const displayedFacets = React.useMemo(() => {
      return refinedFacets.length > 0 ? refinedFacets : usefulFacets;
   }, [usefulFacets, refinedFacets]);
   return {
      facets: displayedFacets,
      areRefined: refinedFacets.length > 0,
   };
}

function isAvailableToProUsers(facet: Facet): boolean {
   return facet.algoliaName !== 'price_range';
}

function isUsefulFacet(facet: Facet): boolean {
   return (
      !FACET_BLOCKLIST.includes(facet.algoliaName) &&
      facet.options.allIds.length > 1
   );
}

function hasMatchingOptions(facet: Facet): boolean {
   return facet.options.allIds.some(
      (id) => facet.options.byId[id].filteredHitCount > 0
   );
}
