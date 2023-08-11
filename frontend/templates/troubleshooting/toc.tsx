import { Flex, Text } from '@chakra-ui/react';
import { TOCItem, useTOCContext } from './tocContext';

export function TOC() {
   const { getItems } = useTOCContext();
   const items = getItems();

   return (
      <Flex position="fixed" bottom={0}>
         <TOCItems tocItems={items} />
      </Flex>
   );
}

function TOCItems({ tocItems }: { tocItems: TOCItem[] }) {
   const items = tocItems.map((props, index) => {
      return <TOCItem key={index} {...props} />;
   });

   return <>{items}</>;
}

function TOCItem({ title, ref, active }: TOCItem) {
   const onClick = () => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
   };
   return (
      <Text color={active ? 'blue.500' : 'gray.500'} onClick={onClick}>
         {title}
      </Text>
   );
}
