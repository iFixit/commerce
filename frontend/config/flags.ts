export const flags = {
   PRODUCT_PAGE_ENABLED:
      process.env.NEXT_PUBLIC_FLAG__PRODUCT_PAGE_ENABLED === 'true',
   STORE_HOME_PAGE_ENABLED:
      process.env.NEXT_PUBLIC_FLAG__STORE_HOME_PAGE_ENABLED === 'true',
};
