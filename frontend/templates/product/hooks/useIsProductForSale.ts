import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import type { Product } from '@models/product.server';

export function useIsProductForSale(product: Product): boolean {
   const user = useAuthenticatedUser();
   const isProOnlyProduct = product.tags.includes('Pro Only');
   const isProUser = user.data?.is_pro ?? false;
   const isForSale = !isProOnlyProduct || (isProOnlyProduct && isProUser);
   return isForSale;
}
