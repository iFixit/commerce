import { QualityGuarantee } from '@assets/svg';
import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Alert,
   AlertProps,
   Box,
   chakra,
   Flex,
   Heading,
   HStack,
   Icon,
   Link,
   StackProps,
   Text,
   ThemeTypings,
   VStack,
} from '@chakra-ui/react';
import { CompatibleDevice } from '@components/common';
import {
   faCircleExclamation,
   faCircleInfo,
   faTriangleExclamation,
} from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { isLifetimeWarranty } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import { PageContentWrapper, ProductVariantPrice } from '@ifixit/ui';
import { Product, ProductVariant } from '@models/product';
import { useIsProductForSale } from '@templates/product/hooks/useIsProductForSale';
import NextLink from 'next/link';
import * as React from 'react';
import { BuyBoxPropositionSection } from '../ServiceValuePropositionSection';
import { AddToCart, isVariantWithSku } from './AddToCart';
import { GenuinePartBanner } from './GenuinePartBanner';
import { ProductGallery } from './ProductGallery';
import { ProductOptions } from './ProductOptions';
import { ProductRating } from './ProductRating';
import { Prop65Warning } from './Prop65Warning';
import { useInternationalBuyBox } from '@templates/product/hooks/useInternationalBuyBox';
import { InternationalBuyBox } from './InternationalBuyBox';

export type ProductSectionProps = {
   product: Product;
   selectedVariant: ProductVariant;
   onVariantChange: (variantId: string) => void;
   internationalBuyBox: ReturnType<typeof useInternationalBuyBox>;
};

export function ProductSection({
   product,
   selectedVariant,
   onVariantChange,
   internationalBuyBox,
}: ProductSectionProps) {
   const [selectedImageId, setSelectedImageId] = React.useState<string | null>(
      null
   );

   const handleVariantChange = React.useCallback(
      (variantId: string) => {
         onVariantChange(variantId);
         setSelectedImageId(null);
      },
      [onVariantChange]
   );
   const isForSale = useIsProductForSale(product);

   const compatibilityDrawerModelsTruncate = 4;
   const compatibilityDrawerDeviceTruncate = 3;
   const compatibilityDrawerIncomplete =
      product.compatibility &&
      (product.compatibility.devices.length >
         compatibilityDrawerDeviceTruncate ||
         product.compatibility.devices.some(
            (currentValue) =>
               currentValue.variants.length > compatibilityDrawerModelsTruncate
         ));
   return (
      <PageContentWrapper as="section">
         <Flex px={{ base: 5, sm: 0 }}>
            <Flex
               position="sticky"
               alignSelf="flex-start"
               display={{ base: 'none', md: 'flex' }}
               top="10"
               mr={{ base: 5, lg: 10 }}
               direction="column"
               flex="1"
               w="0"
               zIndex="1"
            >
               <ProductGallery
                  product={product}
                  selectedVariant={selectedVariant}
                  selectedImageId={selectedImageId}
                  showThumbnails
                  enableZoom
                  onChangeImage={setSelectedImageId}
               />
               <Box
                  id="zoom-container"
                  position="absolute"
                  top="0"
                  w={{
                     base: 'full',
                     md: '320px',
                     lg: '400px',
                  }}
                  left={{ base: 'calc(100% + 20px)', lg: 'calc(100% + 40px)' }}
                  boxShadow="md"
                  borderRadius="md"
               />
            </Flex>
            <Box
               w={{
                  base: 'full',
                  md: '320px',
                  lg: '400px',
               }}
               pt={{
                  base: 0,
                  md: 5,
               }}
               fontSize="sm"
               position="relative"
            >
               {selectedVariant.sku && (
                  <Text color="gray.500">Item # {selectedVariant.sku}</Text>
               )}
               <ProductTitle mb="2.5">{product.title}</ProductTitle>
               {isForSale && (
                  <ProductVariantPrice
                     price={selectedVariant.price}
                     compareAtPrice={selectedVariant.compareAtPrice}
                     proPricesByTier={selectedVariant.proPricesByTier}
                  />
               )}
               {isForSale && <ProductRating product={product} />}
               <Flex display={{ base: 'flex', md: 'none' }} w="full" pt="6">
                  <ProductGallery
                     product={product}
                     selectedVariant={selectedVariant}
                     selectedImageId={selectedImageId}
                     onChangeImage={setSelectedImageId}
                  />
               </Flex>

               <ProductOptions
                  product={product}
                  selected={selectedVariant.id}
                  onChange={handleVariantChange}
               />
               {isForSale ? (
                  isVariantWithSku(selectedVariant) &&
                  (internationalBuyBox ? (
                     <InternationalBuyBox {...internationalBuyBox} />
                  ) : (
                     <AddToCart
                        product={product}
                        selectedVariant={selectedVariant}
                     />
                  ))
               ) : (
                  <NotForSaleAlert mt="4" />
               )}
               {product.oemPartnership && (
                  <GenuinePartBanner oemPartnership={product.oemPartnership} />
               )}
               {isForSale && (
                  <BuyBoxPropositionSection selectedVariant={selectedVariant} />
               )}
               <Accordion defaultIndex={[0, 1]} allowMultiple mt="10">
                  <AccordionItem>
                     <CustomAccordionButton>Description</CustomAccordionButton>
                     <CustomAccordionPanel>
                        <VStack>
                           <VariantDescription>
                              {selectedVariant.description ??
                                 product.descriptionHtml}
                           </VariantDescription>
                           {selectedVariant.note && (
                              <Alert
                                 status="info"
                                 borderWidth={1}
                                 borderColor="brand.300"
                                 borderRadius="md"
                                 alignItems="flex-start"
                              >
                                 <FaIcon
                                    icon={faCircleInfo}
                                    h="4"
                                    mt="0.5"
                                    mr="2.5"
                                    color="brand.500"
                                 />
                                 <AlertText colorScheme="brand">
                                    {selectedVariant.note}
                                 </AlertText>
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
                                 <AlertText colorScheme="orange">
                                    {selectedVariant.disclaimer}
                                 </AlertText>
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
                                    icon={faTriangleExclamation}
                                    color="red.500"
                                    h="4"
                                    mt="0.5"
                                    mr="2.5"
                                 />
                                 <AlertText colorScheme="red">
                                    {selectedVariant.warning}
                                 </AlertText>
                              </Alert>
                           )}
                        </VStack>
                     </CustomAccordionPanel>
                  </AccordionItem>
                  <WikiHtmlAccordianItem
                     title="Kit contents"
                     contents={selectedVariant.kitContents}
                  />
                  <WikiHtmlAccordianItem
                     title="Assembly contents"
                     contents={selectedVariant.assemblyContents}
                  />
                  <AccordionItem
                     hidden={
                        product.compatibility == null ||
                        product.compatibility.devices.length <= 0
                     }
                  >
                     <CustomAccordionButton>
                        Compatibility
                     </CustomAccordionButton>
                     <CustomAccordionPanel>
                        {product.compatibility?.devices
                           .slice(0, 3)
                           .map((device, index) => (
                              <NextLink
                                 key={index}
                                 href={device.deviceUrl}
                                 passHref
                              >
                                 <chakra.a
                                    role="group"
                                    display="flex"
                                    alignItems="flex-start"
                                    transition="all 300m"
                                    mb="6px"
                                 >
                                    <CompatibleDevice
                                       device={device}
                                       truncate={
                                          compatibilityDrawerModelsTruncate
                                       }
                                    />
                                 </chakra.a>
                              </NextLink>
                           ))}

                        {compatibilityDrawerIncomplete ? (
                           <NextLink href="#compatibility" passHref>
                              <Link
                                 mt={3}
                                 display="block"
                                 fontWeight="medium"
                                 color="brand.500"
                              >
                                 See all compatible devices
                              </Link>
                           </NextLink>
                        ) : null}
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
               </Accordion>

               <VariantWarranty variant={selectedVariant} mt="5" />

               <VStack mt="10" align="flex-start" spacing="4">
                  {product.prop65WarningType && product.prop65Chemicals && (
                     <Prop65Warning
                        type={product.prop65WarningType}
                        chemicals={product.prop65Chemicals}
                     />
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
            </Box>
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

type VariantWarrantyProps = StackProps & {
   variant: ProductVariant;
};

function VariantWarranty({ variant, ...other }: VariantWarrantyProps) {
   const appContext = useAppContext();
   return (
      <HStack
         color="brand.500"
         fontSize="sm"
         as="a"
         target="_blank"
         href={`${appContext.ifixitOrigin}/Info/Warranty`}
         {...other}
      >
         {isLifetimeWarranty(variant.warranty ?? '') && (
            <Icon
               as={QualityGuarantee}
               boxSize="50px"
               color="brand.500"
               borderRadius="full"
            />
         )}
         <Box>{variant.warranty}</Box>
      </HStack>
   );
}

function NotForSaleAlert(props: AlertProps) {
   return (
      <Alert
         status="warning"
         borderWidth={1}
         borderColor="orange.300"
         borderRadius="md"
         alignItems="flex-start"
         {...props}
      >
         <FaIcon
            icon={faCircleExclamation}
            h="4"
            mt="0.5"
            mr="2.5"
            color="orange.500"
         />
         <Box fontSize="sm">
            <p>Product available for pro users only.</p>
            <p>
               Learn more about{' '}
               <Link
                  href="https://pro.ifixit.com"
                  target="_blank"
                  fontWeight="bold"
                  textDecoration="underline"
                  _hover={{
                     color: 'orange.800',
                  }}
               >
                  iFixit Pro
               </Link>
               .
            </p>
         </Box>
      </Alert>
   );
}

type VariantDescriptionProps = {
   children: string;
};

function VariantDescription({ children }: VariantDescriptionProps) {
   return (
      <Box
         dangerouslySetInnerHTML={{
            __html: children,
         }}
         fontSize="sm"
         sx={{
            ul: {
               my: 3,
               pl: 5,
            },
            p: {
               mb: 3,
               _last: {
                  mb: 0,
               },
            },
            a: {
               color: 'brand.500',
            },
            'a:hover': {
               textDecoration: 'underline',
            },
         }}
      />
   );
}

type AlertTextProps = {
   children: string;
   colorScheme: ThemeTypings['colorSchemes'];
};

function AlertText({ children, colorScheme }: AlertTextProps) {
   return (
      <Box
         fontSize="sm"
         sx={{
            a: {
               fontWeight: 'bold',
               textDecoration: 'underline',
               transition: 'all 300ms',
            },
            'a:hover': {
               color: `${colorScheme}.800`,
            },
         }}
         dangerouslySetInnerHTML={{
            __html: children,
         }}
      />
   );
}

function WikiHtmlAccordianItem({
   title,
   contents,
}: {
   title: string;
   contents: string | null;
}) {
   return (
      <AccordionItem hidden={contents == null}>
         <CustomAccordionButton>{title}</CustomAccordionButton>
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
                  __html: contents ?? '',
               }}
            ></Box>
         </CustomAccordionPanel>
      </AccordionItem>
   );
}
