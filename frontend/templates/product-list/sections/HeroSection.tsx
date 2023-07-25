import {
   Box,
   BoxProps,
   Button,
   Flex,
   forwardRef,
   Heading,
   Image as ChakraImage,
   Text,
   useDisclosure,
} from '@chakra-ui/react';
import { DEFAULT_ANIMATION_DURATION_MS } from '@config/constants';
import { isPresent } from '@ifixit/helpers';
import { ResponsiveImage, useIsMounted, Wrapper } from '@ifixit/ui';
import type { Image } from '@models/components/image';
import * as React from 'react';
import { usePagination } from 'react-instantsearch-hooks-web';
import snarkdown from 'snarkdown';

export interface HeroSectionProps {
   title: string;
   tagline?: string | null;
   description?: string | null;
   backgroundImage?: Image | null;
   brandLogo?: Image | null;
}

export function HeroSection({
   title,
   tagline,
   description,
   backgroundImage,
   brandLogo,
}: HeroSectionProps) {
   return (
      <Wrapper as="section">
         {backgroundImage ? (
            <Flex
               pos="relative"
               minH="96"
               borderRadius="base"
               overflow="hidden"
            >
               <ResponsiveImage
                  priority
                  fill
                  style={{
                     objectFit: 'cover',
                     zIndex: -1,
                  }}
                  src={backgroundImage.url}
                  alt={backgroundImage.altText ?? ''}
               />

               <Box
                  zIndex={-1}
                  position="absolute"
                  top="0"
                  left="0"
                  w="full"
                  h="full"
                  bgGradient="linear-gradient(90deg, rgba(0, 0, 0, 0.6) 28.7%, rgba(0, 0, 0, 0.1) 86.8%);"
               />

               <Flex
                  alignSelf="flex-end"
                  direction="column"
                  color="white"
                  maxW={{ base: 'full', md: '50%', lg: '40%' }}
                  pt="24"
                  m={{ base: 4, md: 8 }}
               >
                  {brandLogo && brandLogo.width && (
                     <ChakraImage
                        src={brandLogo.url}
                        alt={brandLogo.altText ?? ''}
                        width={brandLogo.width}
                        mb="4"
                     />
                  )}
                  <HeroTitle>{title}</HeroTitle>
                  {isPresent(tagline) && (
                     <Text as="h2" fontWeight="medium">
                        {tagline}
                     </Text>
                  )}
                  {isPresent(description) && (
                     <DescriptionRichText mt="4">
                        {description}
                     </DescriptionRichText>
                  )}
               </Flex>
            </Flex>
         ) : (
            <Flex direction="column">
               <HeroTitle>{title}</HeroTitle>
               {isPresent(tagline) && (
                  <Text as="h2" fontWeight="medium" data-testid="hero-tagline">
                     {tagline}
                  </Text>
               )}
               {isPresent(description) && (
                  <HeroDescription>{description}</HeroDescription>
               )}
            </Flex>
         )}
      </Wrapper>
   );
}

function HeroTitle({ children }: React.PropsWithChildren) {
   const pagination = usePagination();
   const page = pagination.currentRefinement + 1;
   return (
      <Heading
         as="h1"
         size="xl"
         fontSize={{ base: '2xl', md: '3xl' }}
         fontWeight="medium"
         data-testid="hero-title"
      >
         {children}
         {page > 1 ? ` - Page ${page}` : ''}
      </Heading>
   );
}

const NUMBER_OF_LINES = 5;
const LINE_HEIGHT = 25;
const VISIBLE_HEIGHT = NUMBER_OF_LINES * LINE_HEIGHT;

interface HeroDescriptionProps {
   children: string;
}

function HeroDescription({ children }: HeroDescriptionProps) {
   const { isOpen, onToggle } = useDisclosure();
   const isMounted = useIsMounted();
   const textRef = React.useRef<HTMLParagraphElement | null>(null);
   const textHeight = React.useMemo(() => {
      if (isMounted && textRef.current) {
         return textRef.current.clientHeight;
      }
      return 0;
   }, [isMounted, textRef]);
   const isShowMoreVisible = textHeight > VISIBLE_HEIGHT;

   return (
      <Box mt="4" data-testid="hero-description">
         <Box
            maxH={isOpen ? textHeight : VISIBLE_HEIGHT}
            overflow="hidden"
            transition={`all ${DEFAULT_ANIMATION_DURATION_MS}ms`}
         >
            <DescriptionRichText ref={textRef}>{children}</DescriptionRichText>
         </Box>
         {isShowMoreVisible && (
            <Button
               variant="link"
               color="gray.800"
               size="sm"
               onClick={onToggle}
               mt="1"
               pl="2"
               pr="2"
               py="1"
               ml="-8px"
               display="block"
            >
               {isOpen ? 'Show less' : 'Show more'}
            </Button>
         )}
      </Box>
   );
}

type DescriptionRichTextProps = Omit<BoxProps, 'children'> & {
   children: string;
};

const DescriptionRichText = forwardRef<DescriptionRichTextProps, 'div'>(
   ({ children, ...other }, ref) => {
      const html = React.useMemo(() => {
         const preserveNewlines = children.trim().replace(/\n/g, '<br />');
         return snarkdown(preserveNewlines);
      }, [children]);

      return (
         <Box
            sx={{
               a: {
                  color: 'brand.500',
                  transition: 'color 300ms',
                  '&:hover': {
                     color: 'brand.600',
                  },
               },
            }}
            ref={ref}
            dangerouslySetInnerHTML={{ __html: html }}
            {...other}
         />
      );
   }
);
