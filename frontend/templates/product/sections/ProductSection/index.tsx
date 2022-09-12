import { LifetimeWarrantyIcon } from '@assets/svg';
import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Alert,
   AlertIcon,
   Box,
   Button,
   chakra,
   Flex,
   Heading,
   HStack,
   Icon,
   IconButton,
   Link,
   List,
   ListIcon,
   ListItem,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverHeader,
   PopoverTrigger,
   Text,
   VStack,
} from '@chakra-ui/react';
import { useAppContext } from '@ifixit/app';
import { useAddToCart } from '@ifixit/cart-sdk';
import { useCartDrawer, PageContentWrapper } from '@ifixit/ui';
import { Product, ProductVariant } from '@models/product';
import * as React from 'react';
import {
   FaExclamationTriangle,
   FaInfoCircle,
   FaPercent,
   FaShieldAlt,
   FaTruck,
} from 'react-icons/fa';
import { ProductGallery } from './ProductGallery';
import { ProductOptions } from './ProductOptions';
import { ProductRating } from './ProductRating';

export type ProductSectionProps = {
   product: Product;
   selectedVariant: ProductVariant;
   onVariantChange: (variantId: string) => void;
};

export function ProductSection({
   product,
   selectedVariant,
   onVariantChange,
}: ProductSectionProps) {
   const appContext = useAppContext();
   const addToCart = useAddToCart();
   const { onOpen } = useCartDrawer();

   const [selectedImageId, setSelectedImageId] = React.useState(
      selectedVariant.image?.id
   );

   const handleVariantChange = React.useCallback(
      (variantId: string) => {
         onVariantChange(variantId);
         const variant = product.variants.find(
            (variant) => variant.id === variantId
         )!;
         setSelectedImageId(variant.image?.id);
      },
      [product.variants, onVariantChange]
   );

   const handleAddToCart = React.useCallback(() => {
      if (selectedVariant.sku) {
         addToCart.mutate({
            name: product.title,
            itemcode: selectedVariant.sku,
            formattedPrice: selectedVariant.formattedPrice,
            quantity: 1,
            imageSrc: selectedVariant.image?.url || product.images[0].url,
         });
         onOpen();
      }
   }, [
      addToCart,
      product.title,
      selectedVariant.sku,
      selectedVariant.formattedPrice,
      selectedVariant.image,
      product.images,
      onOpen,
   ]);

   return (
      <PageContentWrapper as="section">
         <Flex alignItems="flex-start">
            <ProductGallery
               product={product}
               selectedVariantId={selectedVariant.id}
               selectedImageId={selectedImageId}
               onChange={setSelectedImageId}
            />
            {/* Details */}
            <Flex
               flexGrow={1}
               w="200px"
               pt="5"
               direction="column"
               fontSize="sm"
            >
               {selectedVariant.sku && (
                  <Text color="gray.500">Item # {selectedVariant.sku}</Text>
               )}
               <ProductTitle mb="2.5">{product.title}</ProductTitle>
               <ProductPrice
                  price={selectedVariant.formattedPrice}
                  compareAt={selectedVariant.formattedCompareAtPrice}
               />
               <ProductRating product={product} />
               <ProductOptions
                  product={product}
                  selected={selectedVariant.id}
                  onChange={handleVariantChange}
               />
               <VStack mt="5" align="center">
                  <Button
                     w="full"
                     colorScheme="brand"
                     isLoading={addToCart.isLoading}
                     onClick={handleAddToCart}
                  >
                     Add to cart
                  </Button>
                  {selectedVariant.quantityAvailable &&
                     selectedVariant.quantityAvailable < 10 && (
                        <Alert
                           status="error"
                           bg="transparent"
                           justifyContent="center"
                           color="red.600"
                           py="0"
                           fontSize="xs"
                        >
                           <AlertIcon boxSize="4" />
                           Only{' '}
                           <Text fontWeight="bold" mx="1">
                              {selectedVariant.quantityAvailable}
                           </Text>{' '}
                           left
                        </Alert>
                     )}

                  <Alert
                     status="info"
                     bg="transparent"
                     justifyContent="center"
                     colorScheme="gray"
                     py="0"
                     fontSize="xs"
                  >
                     <AlertIcon boxSize="4" />
                     Shipping restrictions apply
                  </Alert>
               </VStack>
               <div>
                  <List spacing="2.5" fontSize="sm" mt="5">
                     <ListItem display="flex" alignItems="center">
                        <ListIcon
                           as={FaPercent}
                           color="brand.500"
                           boxSize="5"
                        />
                        Satisfaction guaranteed or you money back
                     </ListItem>
                     <ListItem display="flex" alignItems="center">
                        <ListIcon
                           as={FaShieldAlt}
                           color="brand.500"
                           boxSize="5"
                        />
                        <div>
                           If it doesn&apos;t meet our meticulous standards, we
                           won&apos;t sell it. Period.
                        </div>
                     </ListItem>
                     <ListItem display="flex" alignItems="center">
                        <ListIcon as={FaTruck} color="brand.500" boxSize="5" />
                        Same day shipping if ordered by 5PM
                     </ListItem>
                  </List>
               </div>
               <Accordion defaultIndex={[0, 1]} allowMultiple mt="10">
                  <AccordionItem>
                     <CustomAccordionButton>Description</CustomAccordionButton>
                     <CustomAccordionPanel>
                        <VStack>
                           <Box
                              dangerouslySetInnerHTML={{
                                 __html: product.descriptionHtml,
                              }}
                              fontSize="sm"
                              sx={{
                                 ul: {
                                    my: 3,
                                    pl: 5,
                                 },
                              }}
                           />
                           {selectedVariant.note && (
                              <Alert
                                 status="info"
                                 borderWidth={1}
                                 borderColor="brand.300"
                                 borderRadius="md"
                                 alignItems="flex-start"
                              >
                                 <AlertIcon />
                                 <Box
                                    fontSize="sm"
                                    dangerouslySetInnerHTML={{
                                       __html: selectedVariant.note,
                                    }}
                                 />
                              </Alert>
                           )}
                           {selectedVariant.disclaimer && (
                              <Alert
                                 status="warning"
                                 borderWidth={1}
                                 borderColor="orange.300"
                                 borderRadius="md"
                                 alignItems="flex-start"
                              >
                                 <AlertIcon />
                                 <Box
                                    fontSize="sm"
                                    dangerouslySetInnerHTML={{
                                       __html: selectedVariant.disclaimer,
                                    }}
                                 />
                              </Alert>
                           )}
                           {selectedVariant.warning && (
                              <Alert
                                 status="error"
                                 borderWidth={1}
                                 borderColor="red.300"
                                 borderRadius="md"
                                 alignItems="flex-start"
                              >
                                 <AlertIcon />
                                 <Box
                                    fontSize="sm"
                                    dangerouslySetInnerHTML={{
                                       __html: selectedVariant.warning,
                                    }}
                                 />
                              </Alert>
                           )}
                        </VStack>
                     </CustomAccordionPanel>
                  </AccordionItem>
                  <AccordionItem hidden={selectedVariant.kitContents == null}>
                     <CustomAccordionButton>Kit contents</CustomAccordionButton>
                     <CustomAccordionPanel>
                        <Box
                           fontSize="sm"
                           sx={{
                              ul: {
                                 listStyle: 'none',
                              },
                              li: {
                                 borderTopWidth: '1px',
                                 borderTopColor: 'gray.200',
                                 py: 3,
                                 '& ul': {
                                    mt: 3,
                                    ml: 5,
                                 },
                              },
                           }}
                           dangerouslySetInnerHTML={{
                              __html: selectedVariant.kitContents ?? '',
                           }}
                        ></Box>
                     </CustomAccordionPanel>
                  </AccordionItem>

                  <AccordionItem
                     hidden={selectedVariant.specifications == null}
                  >
                     <CustomAccordionButton>
                        Specifications
                     </CustomAccordionButton>
                     <CustomAccordionPanel>
                        <Box
                           dangerouslySetInnerHTML={{
                              __html: selectedVariant.specifications ?? '',
                           }}
                           fontSize="sm"
                           sx={{
                              table: {
                                 display: 'flex',
                                 p: 1.5,
                              },
                              tbody: {
                                 w: 'full',
                              },
                              tr: {
                                 display: 'flex',
                                 flexDirection: 'column',
                                 borderTopWidth: '1px',
                                 borderTopColor: 'gray.200',
                                 py: 2,
                              },
                              th: {
                                 textAlign: 'left',
                              },
                           }}
                        />
                     </CustomAccordionPanel>
                  </AccordionItem>

                  <AccordionItem hidden={selectedVariant.warranty == null}>
                     <CustomAccordionButton>Warranty</CustomAccordionButton>
                     <CustomAccordionPanel>
                        <HStack
                           color="brand.500"
                           fontSize="sm"
                           as="a"
                           href={`${appContext.ifixitOrigin}/Info/Warranty`}
                        >
                           {/lifetime/i.test(
                              selectedVariant.warranty ?? ''
                           ) && (
                              <Icon
                                 as={LifetimeWarrantyIcon}
                                 boxSize="50px"
                                 color="brand.500"
                                 borderRadius="full"
                              />
                           )}
                           <Box>{selectedVariant.warranty}</Box>
                        </HStack>
                     </CustomAccordionPanel>
                  </AccordionItem>
               </Accordion>
               <VStack mt="10" align="flex-start" spacing="4">
                  {product.prop65WarningType && product.prop65Chemicals && (
                     <Flex align="center">
                        <Text>California Residents: Prop 65 WARNING</Text>
                        <Popover>
                           <PopoverTrigger>
                              <IconButton
                                 variant="ghost"
                                 aria-label="read more about the warning"
                                 size="sm"
                                 icon={
                                    <Icon as={FaInfoCircle} color="brand.500" />
                                 }
                              >
                                 Trigger
                              </IconButton>
                           </PopoverTrigger>
                           <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton mt="0.5" />
                              <PopoverHeader textTransform="uppercase">
                                 <Flex align="center">
                                    <Icon
                                       as={FaExclamationTriangle}
                                       color="yellow.500"
                                       mr="2"
                                    />
                                    Warning
                                 </Flex>
                              </PopoverHeader>
                              <PopoverBody>
                                 <Text>
                                    This product can expose you to chemicals
                                    including {product.prop65Chemicals} which is
                                    known to the State of California to cause{' '}
                                    {product.prop65WarningType}.
                                 </Text>
                                 <Text mt="2">
                                    For more information, go to{' '}
                                    <Link
                                       href="www.P65Warnings.ca.gov"
                                       color="brand.500"
                                    >
                                       www.P65Warnings.ca.gov
                                    </Link>
                                 </Text>
                              </PopoverBody>
                           </PopoverContent>
                        </Popover>
                     </Flex>
                  )}
                  {product.productVideos && (
                     <Box
                        as="iframe"
                        width="100%"
                        height="315"
                        src={product.productVideos}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                     />
                  )}
               </VStack>
            </Flex>
         </Flex>
      </PageContentWrapper>
   );
}

const ProductTitle = chakra(
   ({
      children,
      className,
   }: React.PropsWithChildren<{ className?: string }>) => {
      return (
         <Heading
            as="h1"
            className={className}
            size="xl"
            fontFamily="Archivo Black"
         >
            {children}
         </Heading>
      );
   }
);

type ProductPriceProps = {
   price: string;
   compareAt?: string | null;
};

function ProductPrice({ price, compareAt }: ProductPriceProps) {
   return (
      <Text fontWeight="bold" fontSize="xl">
         {price}
      </Text>
   );
}

type CustomAccordionButtonProps = React.PropsWithChildren<{}>;

function CustomAccordionButton({ children }: CustomAccordionButtonProps) {
   return (
      <AccordionButton py="5" px="1.5">
         <Box
            flex="1"
            textAlign="left"
            color="gray.800"
            fontWeight="bold"
            fontSize="sm"
         >
            {children}
         </Box>
         <AccordionIcon />
      </AccordionButton>
   );
}

type CustomAccordionPanelProps = React.PropsWithChildren<{}>;

function CustomAccordionPanel({ children }: CustomAccordionPanelProps) {
   return (
      <AccordionPanel pb={4} px="1.5">
         {children}
      </AccordionPanel>
   );
}
