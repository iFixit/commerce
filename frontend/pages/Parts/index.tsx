import { withLogging } from '@helpers/next-helpers';
import { ProductListType } from '@models/product-list';
import { getProductListServerSideProps } from '@templates/product-list/server';

export { default } from '@templates/product-list';

export const getServerSideProps = withLogging({ pageName: 'parts' })(
   getProductListServerSideProps({
      productListType: ProductListType.AllParts,
   })
);
