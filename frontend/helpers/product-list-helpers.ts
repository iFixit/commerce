import { invariant } from '@ifixit/helpers';
import { ProductList, ProductListType } from '@models/product-list';
import { RefinementDisplayType } from '@models/product-list/types';

type ProductListAttributes = {
   filters?: string | null;
   deviceTitle?: string | null;
   type?: ProductListType | null;
   itemType?: string | null;
};

export function computeProductListAlgoliaFilterPreset<
   T extends ProductListAttributes
>(productList: T): string | undefined {
   const { filters, deviceTitle } = productList;
   const conditions: string[] = [];

   if (filters && filters.length > 0) {
      // Algolia can't handle newlines in the filter, so replace with space.
      conditions.push(filters.replaceAll('\n', ' '));
   } else if (deviceTitle && deviceTitle.length > 0) {
      conditions.push(`device:${JSON.stringify(deviceTitle)}`);
   }

   return conditions.length ? conditions.join(' AND ') : undefined;
}

/**
 * Convert '_' in URL slug to spaces for product list device Item Types
 */
export function destylizeDeviceItemType(itemTypeHandle: string): string {
   return itemTypeHandle.replace(/_+/g, ' ');
}

/**
 * Convert to spaces in product list device Item Types to '_' for URL slug
 */
export function stylizeDeviceItemType(itemType: string): string {
   return itemType.replace(/\s+/g, '_');
}

/**
 * Convert '_' in URL slug to spaces for product list device title
 */
export function destylizeDeviceTitle(handle: string): string {
   return handle.replace(/_/g, ' ');
}

/**
 * Convert to spaces in product list device Title to '_' for URL slug
 */
export function stylizeDeviceTitle(deviceTitle: string): string {
   return deviceTitle.replace(/\s/g, '_');
}

type ProductListTitleAttributes = {
   type: ProductListType;
   title: string;
};

export function getProductListTitle(
   productList: ProductListTitleAttributes,
   itemType?: string
): string {
   if (productList.type === ProductListType.DeviceParts && itemType) {
      return `${productList.title.replace(/parts$/i, '').trim()} ${itemType}`;
   }
   return productList.title;
}

const refinementDisplayTypeMap: Record<string, RefinementDisplayType> = {
   'facet_tags.Capacity': RefinementDisplayType.MultiSelect,
   price_range: RefinementDisplayType.MultiSelect,
};

export function getRefinementDisplayType(attribute: string) {
   return (
      refinementDisplayTypeMap[attribute] ?? RefinementDisplayType.SingleSelect
   );
}
