interface Reviewable {
   rating: number;
   count: number;
}

const ITEMCODE_RE = /IF(\d{3})-(\d{3})-(\d{1,2})/;

export function shouldShowProductRating<R extends Reviewable>(
   reviewable: R | null | undefined
): reviewable is R {
   if (reviewable?.rating == null || reviewable?.count == null) {
      return false;
   }
   return reviewable.rating >= 4 || reviewable.count > 10;
}

/**
 * @param itemcode iFixit product variant itemcode (e.g. IF145-307-4)
 * @returns iFixit product variant sku (e.g. 1453074)
 */
export function getProductVariantSku(itemcode: string): string {
   return itemcode.replace(/\D/g, '');
}

export function parseItemcode(itemcode: string) {
   let matches = itemcode.match(ITEMCODE_RE);
   return matches
      ? {
           category: matches[1],
           productcode: matches[1] + matches[2],
           optionid: matches[3],
        }
      : {};
}

export function isLifetimeWarranty(
   warranty: string | undefined | null
): boolean {
   if (!warranty) return false;
   return /lifetime/i.test(warranty);
}
