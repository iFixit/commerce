import {
   Button,
   ButtonGroup,
   ButtonGroupProps,
   ButtonProps,
   Flex,
   IconButton,
   IconButtonProps,
   Select,
   SelectProps,
   Stack,
   Text,
   useDisclosure,
} from '@chakra-ui/react';
import { faList } from '@fortawesome/pro-solid-svg-icons';
import { faGrid } from '@fortawesome/pro-solid-svg-icons';
import { getProductListTitle } from '@helpers/product-list-helpers';
import { FaIcon } from '@ifixit/icons';
import { ProductList } from '@models/product-list';
import * as React from 'react';
import { useHits } from 'react-instantsearch-hooks-web';
import { FacetsDrawer } from './facets/drawer';
import { SearchInput } from './SearchInput';

export enum ProductViewType {
   Grid = 'grid',
   List = 'list',
}

export type ToolbarProps = {
   viewType: ProductViewType;
   productList: ProductList;
   onViewTypeChange: (viewType: ProductViewType) => void;
};

export function Toolbar(props: ToolbarProps) {
   const { viewType, onViewTypeChange, productList } = props;
   const drawer = useDisclosure({
      defaultIsOpen: false,
   });
   const scrollRef = React.useRef<HTMLDivElement>(null);
   const isFirstRender = React.useRef(true);
   React.useEffect(() => {
      if (!isFirstRender.current && !drawer.isOpen) {
         scrollRef.current?.scrollIntoView();
      }
      isFirstRender.current = false;
   }, [drawer.isOpen]);
   return (
      <>
         <FacetsDrawer
            isOpen={drawer.isOpen}
            onClose={drawer.onClose}
            productList={productList}
         />
         <Stack
            ref={scrollRef}
            justify={{ md: 'space-between' }}
            align={{ base: 'stretch', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
         >
            <NumberOfHits />
            <Flex
               wrap="wrap"
               flexGrow={1}
               justify="flex-end"
               px={{ base: 6, sm: 0 }}
            >
               <OpenFiltersButton onClick={drawer.onOpen}>
                  Filters
               </OpenFiltersButton>
               <SearchInput
                  placeholder={`Search ${getProductListTitle(productList)}`}
                  order={{
                     base: 3,
                     md: 2,
                  }}
                  maxW={{
                     base: 'full',
                     md: '80',
                  }}
                  mt={{
                     base: '2',
                     md: '0',
                  }}
                  flexGrow={1}
               />
               <ProductViewSwitch
                  ml="2"
                  order={{
                     base: 2,
                     md: 3,
                  }}
               >
                  <ProductViewListButton
                     aria-label="Select list view"
                     data-testid="list-view-button"
                     isActive={viewType === ProductViewType.List}
                     onClick={() => onViewTypeChange(ProductViewType.List)}
                  />
                  <ProductViewGridButton
                     aria-label="Select grid view"
                     data-testid="grid-view-button"
                     isActive={viewType === ProductViewType.Grid}
                     onClick={() => onViewTypeChange(ProductViewType.Grid)}
                  />
               </ProductViewSwitch>
            </Flex>
         </Stack>
      </>
   );
}

export function NumberOfHits() {
   const { results } = useHits();
   const hitsCount = results?.nbHits;
   if (hitsCount == null) {
      return null;
   }
   return (
      <Text textAlign="center" color="gray.500" fontWeight="bold">
         {hitsCount}
         {hitsCount === 1 ? ' result' : ' results'}
      </Text>
   );
}

export const OpenFiltersButton = (props: ButtonProps) => {
   return (
      <Button
         variant="outline"
         bg="white"
         display={{ base: 'block', md: 'none' }}
         minW="50%"
         flexGrow={1}
         {...props}
      />
   );
};

export const SortBySelect = (props: SelectProps) => {
   return (
      <Select
         variant="outline"
         bg="white"
         flexBasis="100px"
         flexGrow={1}
         display={{ base: 'block', md: 'none' }}
         fontWeight="semibold"
         {...props}
      />
   );
};

export const ProductViewSwitch = (props: ButtonGroupProps) => {
   return (
      <ButtonGroup
         size="sm"
         isAttached
         bg="white"
         borderRadius="md"
         {...props}
      />
   );
};

export const ProductViewListButton = (props: IconButtonProps) => {
   return (
      <IconButton
         icon={<FaIcon icon={faList} h="4" color="gray.500" />}
         variant="outline"
         size="md"
         {...props}
      />
   );
};

export const ProductViewGridButton = (props: IconButtonProps) => {
   return (
      <IconButton
         icon={<FaIcon icon={faGrid} h="4" color="gray.500" />}
         variant="outline"
         size="md"
         {...props}
      />
   );
};
