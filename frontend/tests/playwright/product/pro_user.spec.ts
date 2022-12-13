import { interceptLogin } from '../utils';
import { test, expect } from '@playwright/test';

test.describe('Pro user test', () => {
   test('will give pro users a discount', async ({ page }) => {
      await page.goto('/products/repair-business-toolkit');

      // Get price from page
      const originalPriceString = await page
         .getByTestId('product-price')
         .first()
         .innerText();

      // Login as pro and reload page
      await interceptLogin(page, {
         discount_tier: 'pro_4',
      });
      await page.reload({ waitUntil: 'networkidle' });

      // Assert price on page is lower than step 1
      const proPriceString = await page
         .getByTestId('product-price')
         .first()
         .innerText();

      expect(parseFloat(originalPriceString.replace('$', ''))).toBeGreaterThan(
         parseFloat(proPriceString.replace('$', ''))
      );
   });
});
