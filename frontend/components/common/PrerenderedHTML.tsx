// This component is used to render HTML that is generated by the PHP app or Strapi. Styling
// is broken up into `shared`, `troubleshooting`, and `commerce` variables to control what
// is included, and where via the styleMap.

import { Box, BoxProps, SystemStyleObject, forwardRef } from '@chakra-ui/react';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import { useEffect } from 'react';

type PrerenderedHTMLProps = BoxProps & {
   html: string;
   template: 'troubleshooting' | 'commerce';
};

export const PrerenderedHTML = forwardRef<PrerenderedHTMLProps, 'div'>(
   function PrerenderedHTML({ html, template, className, ...others }, ref) {
      useEffect(() => {
         if (template === 'troubleshooting') {
            import('lite-youtube-embed');
         }
      }, [template]);

      return (
         <Box
            ref={ref}
            className={className ? `prerendered ${className}` : 'prerendered'}
            sx={styleMap[template]}
            dangerouslySetInnerHTML={{ __html: html }}
            {...others}
         />
      );
   }
);

const constrainStandardWidth = '282px'; // pulled from PHP app for legacy image sizing

const sharedStyles: SystemStyleObject = {
   a: {
      color: 'brand.500',
      transition: 'color 300ms',

      '&:hover': {
         color: 'brand.600',
         textDecoration: 'underline',
      },
   },

   blockquote: {
      marginTop: 6,
      borderLeft: '4px solid',
      borderLeftColor: 'gray.300',
      paddingInline: '1em',
   },

   h3: {
      fontSize: 'xl',
      lineHeight: '1.2',
   },

   'h3, h4': {
      fontWeight: 600,
   },

   'h4, h5': {
      fontSize: 'md',
      lineHeight: '1.25',
   },

   pre: {
      marginTop: '1em',
      paddingInline: 1,
      maxWidth: '100%',
      overflow: 'auto',
   },

   th: {
      textAlign: 'left',
   },

   '.fa-svg-icon': {
      svg: {
         width: '1em',
         height: '1em',
         display: 'inline-block',

         path: {
            fill: 'currentColor',
         },
      },

      '&.xs svg': {
         width: '0.5em',
         height: '0.5em',
      },

      '&.sm svg': {
         width: '0.75em',
         height: '0.75em',
      },
   },
};

const troubleshootingStyles: SystemStyleObject = {
   ...sharedStyles,

   '&': {
      gap: '1em',
   },

   '.clearer': {
      clear: 'both',
      height: '0',
      padding: '0',
      margin: '0',
      lineHeight: '0',
      fontSize: '0',
   },

   // handle the first-child header, which gets .clearer appended
   '.clearer:not(:first-child) + .headerContainer': {
      marginTop: { base: 4, sm: 6 },
   },

   '.headerContainer': {
      display: 'flex',
      alignItems: 'baseline',

      '&:hover .selfLink': {
         opacity: '1',
      },

      '.selfLink': {
         color: 'gray.500',
         order: '2', // swap the legacy order with flexbox
         opacity: '0',
         paddingLeft: 2,
         transition: 'opacity ease-in-out',
         transitionDuration: 'fast',
      },
   },

   blockquote: {
      borderColor: 'gray.300',
      borderLeftWidth: '4px',
      marginTop: '1em',
      paddingLeft: '1em',

      '&.featured': {
         borderColor: 'gray.300',
         borderWidth: '1px',
         borderLeftWidth: '4px',
         borderRadius: 'md',
         padding: 2,
         color: 'orange.500',
         bgColor: 'white',
      },

      '& > p:not(:first-child)': {
         marginTop: '1em',
      },
   },

   'code, pre': {
      backgroundColor: 'gray.200',
      borderRadius: 'md',
      color: 'coolGray.600',
      borderStyle: 'none',
   },

   p: {
      lineHeight: '1.38',
      alignSelf: 'stretch',

      '&:not(:first-child)': {
         marginTop: '1em',
      },
   },

   // use 1em as a standard spacing for lists
   'ul, ol': {
      marginTop: '1em',
      marginInlineStart: '1em',
      paddingInlineStart: 'calc(1em + 2px)',

      li: {
         _notFirst: {
            marginTop: '1em',
         },
      },
   },

   '.table-container': {
      position: 'relative',
      width: 'fit-content',
      marginTop: 4,
   },

   '.table-overflow': {
      overflowX: 'auto',
   },

   tr: {
      verticalAlign: 'top',

      _notLast: {
         '& > td': {
            paddingBottom: 3,
         },
      },
   },

   td: {
      _notLast: {
         paddingRight: 3,
      },
   },

   'lite-youtube': {
      marginTop: 4,
      borderRadius: 'md',
      overflow: 'hidden',
      border: '1px solid',
      borderColor: 'gray.300',
      maxWidth: '100%',

      // override lite-youtube inline styles on mobile
      '@media only screen and (max-width: 575px)': {
         height: 'auto !important',
         width: '100% !important',
      },

      '&.float-left': {
         clear: 'left',
         float: 'left',
      },

      '&.float-right': {
         clear: 'right',
         float: 'right',
      },

      '&.mx-auto': {
         marginInline: 'auto',
      },
   },

   '.videoFrame': {
      maxWidth: '100%',
      marginBlock: 2,
      height: 'auto',

      '@media only screen and (max-width: 575px)': {
         width: 'auto',
      },

      '&.videoBox_center': {
         marginInline: 'auto',
      },
   },

   '.videoBox': {
      position: 'relative',
      overflow: 'hidden',
      maxWidth: '100%',
      aspectRatio: '16 / 9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '&.videoBox_center': {
         marginInline: 'auto',
      },

      '@media only screen and (min-width: 576px)': {
         '&.videoBox_left': {
            clear: 'left',
            float: 'left',
            marginRight: 6,
         },

         '&.videoBox_right': {
            clear: 'right',
            float: 'right',
            marginLeft: 6,
         },
      },

      video: {
         position: 'absolute',
         inset: 0,
      },
   },

   '.imageBox': {
      borderRadius: 'md',
      outline: '1px solid',
      outlineColor: 'gray.300',
      overflow: 'hidden',
      position: 'relative',
      marginTop: { base: 4, sm: 6 },
      minWidth: 'min-content', // narrow image text-wrap fix
      width: 'fit-content',

      '& + ul, & + ol': {
         overflowX: 'auto', // clear sibling lists
      },

      '&.imageBox_center': {
         marginInline: 'auto',

         '> img': {
            clear: 'both',
         },
      },

      img: {
         marginInline: 'auto', // center image when container is wider
      },

      '@media only screen and (max-width: 575px)': {
         width: 'fit-content',
         marginTop: { base: 4, sm: 6 },
         marginInline: 'auto',
      },

      '@media only screen and (min-width: 576px)': {
         '&.imageBox_left': {
            clear: 'left',
            float: 'left',
            marginRight: 6,
         },

         '&.imageBox_right': {
            clear: 'right',
            float: 'right',
            marginLeft: 6,
         },
      },
   },

   'table .imageBox': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      marginTop: 0,

      img: {
         minHeight: '225px',
         objectFit: 'cover',
         width: '100%',
      },
   },

   '.imageBox p': {
      bgColor: 'gray.100',
      borderTop: '1px solid',
      borderColor: 'gray.300',
      flex: 1,
      paddingBlock: 4,
      paddingInline: 3,
   },

   '.blurbListWide .grid': {
      display: 'grid',
      gap: 4,
      gridTemplateColumns: `repeat(auto-fill, minmax(${constrainStandardWidth}, 1fr) )`,

      '& .cell': {
         bgColor: 'gray.100',
         border: '1px solid',
         borderColor: 'gray.300',
         borderRadius: 'md',
         display: 'flex',
         maxWidth: constrainStandardWidth,
         overflow: 'hidden',
         _hover: {
            borderColor: 'brand.500',
            transition: 'border-color var(--chakra-transition-duration-normal)',
         },
      },

      '& a, & a:hover': {
         color: 'inherit',
         textDecoration: 'none',
      },

      '.title-text': {
         borderTop: '1px solid',
         borderColor: 'gray.300',
         paddingBlock: 2,
         paddingInline: 3,
      },
   },
};

const commerceStyles: SystemStyleObject = {
   ...sharedStyles,
};

const styleMap = {
   troubleshooting: troubleshootingStyles,
   commerce: commerceStyles,
};
