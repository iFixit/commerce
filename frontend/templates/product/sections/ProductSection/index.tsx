import { LifetimeWarrantyIcon } from '@assets/svg';
import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Alert,
   Box,
   chakra,
   Flex,
   Heading,
   HStack,
   Icon,
   IconButton,
   Link,
   List,
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
import {
   faBadgeDollar,
   faCircleExclamation,
   faExclamationTriangle,
   faInfoCircle,
   faRocket,
   faShieldCheck,
} from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { FaIcon } from '@ifixit/icons';
import { PageContentWrapper } from '@ifixit/ui';
import { Product, ProductVariant } from '@models/product';
import * as React from 'react';
import { ProductPrice } from '../../../../components/common/ProductPrice';
import { AddToCart } from './AddToCart';
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
            <Flex flexGrow={1} w="200px" pt="5" direction="column">
               {selectedVariant.sku && (
                  <Text color="gray.500">Item # {selectedVariant.sku}</Text>
               )}
               <ProductTitle mb="2.5">{product.title}</ProductTitle>
               <ProductPrice
                  formattedPrice={selectedVariant.formattedPrice}
                  formattedCompareAtPrice={
                     selectedVariant.formattedCompareAtPrice
                  }
                  isDiscounted={selectedVariant.isDiscounted}
                  discountLabel={`${selectedVariant.discountPercentage}% OFF`}
               />
               <ProductRating product={product} />
               <ProductOptions
                  product={product}
                  selected={selectedVariant.id}
                  onChange={handleVariantChange}
               />
               <AddToCart product={product} selectedVariant={selectedVariant} />
               <div>
                  <List spacing="2.5" fontSize="sm" mt="5">
                     <ListItem display="flex" alignItems="center">
                        <Flex
                           justifyContent="center"
                           alignItems="center"
                           w={5}
                           h={5}
                           mr={1.5}
                        >
                           <FaIcon
                              icon={faBadgeDollar}
                              h="4"
                              color="brand.500"
                           />
                        </Flex>
                        Satisfaction guaranteed or you money back
                     </ListItem>
                     <ListItem display="flex" alignItems="center">
                        <Flex
                           justifyContent="center"
                           alignItems="center"
                           w={5}
                           h={5}
                           mr={1.5}
                        >
                           <FaIcon
                              icon={faShieldCheck}
                              h="4"
                              color="brand.500"
                           />
                        </Flex>
                        <div>
                           If it doesn&apos;t meet our meticulous standards, we
                           won&apos;t sell it. Period.
                        </div>
                     </ListItem>
                     <ListItem display="flex" alignItems="center">
                        <Flex
                           justifyContent="center"
                           alignItems="center"
                           w={5}
                           h={5}
                           mr={1.5}
                        >
                           <FaIcon icon={faRocket} h="4" color="brand.500" />
                        </Flex>
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
                                 <FaIcon
                                    icon={faCircleExclamation}
                                    h="4"
                                    mt="0.5"
                                    mr="2.5"
                                    color="brand.500"
                                 />
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
                                 <FaIcon
                                    icon={faCircleExclamation}
                                    h="4"
                                    mt="0.5"
                                    mr="2.5"
                                    color="orange.500"
                                 />
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
                                 <FaIcon
                                    icon={faCircleExclamation}
                                    color="red.500"
                                    h="4"
                                    mt="0.5"
                                    mr="2.5"
                                 />
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
                                    <FaIcon
                                       icon={faInfoCircle}
                                       h="4"
                                       color="brand.500"
                                    />
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
                                    <FaIcon
                                       icon={faExclamationTriangle}
                                       h="4"
                                       mr="2"
                                       color="yellow.500"
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
