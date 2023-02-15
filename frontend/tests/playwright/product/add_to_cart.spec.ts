import { test, expect } from '../test-fixtures';
import { mockedProductQuery } from '@tests/jest/__mocks__/products';
import { cloneDeep } from 'lodash';

test.describe('product page add to cart', () => {
   test('Clicking Add To Cart Adds Items To Cart', async ({
      productPage,
      cartDrawer,
   }) => {
      await productPage.gotoProduct('spudger-retail-3-pack');

      const sku = await productPage.getSku();
      for (let i = 1; i <= 5; i++) {
         await productPage.addToCart();
         await cartDrawer.assertItemQuantity(sku, i);
         await cartDrawer.close();
      }

      await cartDrawer.open();
      await cartDrawer.assertItemQuantity(sku, 5);
   });

   test('Clicking + and - Buttons Changes Item Quantity in Cart', async ({
      page,
      productPage,
      cartDrawer,
   }) => {
      await productPage.gotoProduct('spudger-retail-3-pack');

      const sku = await productPage.getSku();
      await productPage.addToCart();
      await cartDrawer.assertCartTotalQuantity(1);

      for (let i = 2; i <= 5; i++) {
         await cartDrawer.increaseItemQuantity(sku);
         await cartDrawer.assertItemQuantity(sku, i);
      }

      await cartDrawer.close();
      await cartDrawer.open();

      for (let i = 5; i > 1; i--) {
         await cartDrawer.decreaseItemQuantity(sku);
         await cartDrawer.assertItemQuantity(sku, i - 1);
      }

      await cartDrawer.assertCartTotalQuantity(1);
      await cartDrawer.assertItemQuantity(sku, 1);
   });

   test('Item Can Be Added Again After Removing The Item', async ({
      page,
      productPage,
      cartDrawer,
   }) => {
      await productPage.gotoProduct('spudger-retail-3-pack');
      const sku = await productPage.getSku();

      await productPage.addToCart();
      await cartDrawer.assertCartTotalQuantity(1);

      await cartDrawer.removeItem(sku);

      await cartDrawer.assertCartTotalQuantity(0);
      await cartDrawer.assertItemIsNotPresent(sku);
      await cartDrawer.close();
      await productPage.addToCart();
      await cartDrawer.assertCartTotalQuantity(1);
   });

   test('Back to Shopping Button Works', async ({
      page,
      productPage,
      cartDrawer,
   }) => {
      await productPage.gotoProduct('spudger-retail-3-pack');
      const sku = await productPage.getSku();

      await cartDrawer.open();
      await cartDrawer.assertCartTotalQuantity(0);
      await cartDrawer.assertItemIsNotPresent(sku);
      await page.getByTestId('back-to-shopping').click();
      await cartDrawer.assertDrawerIsClosed();

      await productPage.addToCart();
      await cartDrawer.assertCartTotalQuantity(1);
      await expect(page.getByTestId('back-to-shopping')).not.toBeVisible();

      await cartDrawer.removeItem(sku);

      await cartDrawer.assertCartTotalQuantity(0);
      await cartDrawer.assertItemIsNotPresent(sku);
      await page.getByTestId('back-to-shopping').click();
      await cartDrawer.assertDrawerIsClosed();
   });

   test.describe('Product Stock Levels', () => {
      test('Low stocked product changes quantity', async ({
         page,
         productPage,
         cartDrawer,
         serverRequestInterceptor,
         port,
         graphql,
      }) => {
         serverRequestInterceptor.use(
            graphql.query('findProduct', async (req, res, ctx) => {
               const lowStockedProduct = cloneDeep(mockedProductQuery);
               if (lowStockedProduct.product) {
                  lowStockedProduct.product.variants.nodes[0].quantityAvailable = 3;
               }
               return res(ctx.data(lowStockedProduct));
            })
         );

         await page.goto(
            `http://localhost:${port}/products/iphone-6s-plus-replacement-battery-low-stocked`
         );

         const firstOptionSku = await productPage.getSku();

         await productPage.assertInventoryMessage('Only 3 left');
         await productPage.addToCart();
         await cartDrawer.assertItemQuantity(firstOptionSku, 1);

         await cartDrawer.close();
         await productPage.assertInventoryMessage('Only 2 left');

         await cartDrawer.open();
         await cartDrawer.increaseItemQuantity(firstOptionSku);
         await cartDrawer.assertItemQuantity(firstOptionSku, 2);

         await cartDrawer.close();
         await productPage.assertInventoryMessage('Only 1 left');

         await cartDrawer.open();
         await cartDrawer.increaseItemQuantity(firstOptionSku);
         await cartDrawer.assertItemQuantity(firstOptionSku, 3);

         await cartDrawer.close();
         await productPage.assertInventoryMessage('No more items available');
         await expect(productPage.addToCartButton).toBeDisabled();

         await productPage.switchSelectedVariant();
         const secondOptionSku = await productPage.getSku();

         await expect(productPage.addToCartButton).toBeVisible();
         await productPage.assertInventoryMessage();
         await productPage.addToCart();

         await cartDrawer.assertItemQuantity(secondOptionSku, 1);
         await cartDrawer.assertItemQuantity(firstOptionSku, 3);

         await cartDrawer.decreaseItemQuantity(firstOptionSku);
         await cartDrawer.assertItemQuantity(firstOptionSku, 2);

         await cartDrawer.close();
         await productPage.switchSelectedVariant();
         await productPage.assertInventoryMessage('Only 1 left');
      });

      test('Out of stock product cannot be added to cart', async ({
         page,
         productPage,
         cartDrawer,
         serverRequestInterceptor,
         clientRequestHandler,
         port,
         graphql,
         rest,
      }) => {
         clientRequestHandler.use(
            rest.post(
               '/api/2.0/cart/product/notifyWhenSkuInStock',
               (req, res, ctx) => {
                  return res(ctx.status(200));
               }
            )
         );

         serverRequestInterceptor.use(
            graphql.query('findProduct', async (req, res, ctx) => {
               const outOfStockProduct = cloneDeep(mockedProductQuery);
               if (outOfStockProduct.product) {
                  outOfStockProduct.product.variants.nodes[0].quantityAvailable = 0;
               }
               return res(ctx.data(outOfStockProduct));
            })
         );

         await page.goto(
            `http://localhost:${port}/products/iphone-6s-plus-replacement-battery-out-of-stock`
         );

         await expect(
            page.getByRole('img', { name: 'Fix Kit' })
         ).not.toBeVisible();
         await expect(
            page.getByRole('img', { name: 'Part Only' }).first()
         ).toBeVisible();

         await productPage.switchSelectedVariant();

         await expect(productPage.addToCartButton).not.toBeVisible();
         await productPage.assertInventoryMessage();

         await expect(
            page.getByTestId('out-of-stock-alert')
         ).toBeVisible();

         const notifyMeForm = page.getByTestId('notify-me-form');
         await expect(notifyMeForm).toBeVisible();

         await notifyMeForm.getByLabel('Email address').fill('test@example.com');
         await notifyMeForm.getByRole('button', { name: 'Notify me' }).click();
         await expect(
            page.getByTestId('notify-me-form-successful')
         ).toBeVisible();

         await productPage.switchSelectedVariant();
         await expect(productPage.addToCartButton).toBeVisible();
         await productPage.assertInventoryMessage();

         const partOnlySku = await productPage.getSku();

         await productPage.addToCart();
         await cartDrawer.assertItemQuantity(partOnlySku, 1);
         await cartDrawer.assertItemIsPresent(partOnlySku);

         await cartDrawer.close();
         await expect(productPage.addToCartButton).toBeEnabled();
         await productPage.assertInventoryMessage();
      });
   });
});
