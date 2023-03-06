import { printZodError, toNumber } from '@helpers/zod-helpers';
import { z } from 'zod';

export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;

export const CurrencyCodeSchema = z.enum(['USD']);

export type Money = z.infer<typeof MoneySchema>;

export const MoneySchema = z.object({
   amount: z.preprocess(toNumber, z.number()),
   currencyCode: CurrencyCodeSchema,
});

export function moneyFromAmount(amount: number, code: CurrencyCode): Money;
export function moneyFromAmount(
   amount: number | null | undefined,
   code?: CurrencyCode | null
): Money | null;
export function moneyFromAmount(
   amount: number | null | undefined,
   code?: CurrencyCode | null
): Money | null {
   if (amount == null || code == null) return null;
   return {
      amount,
      currencyCode: code,
   };
}

export function getCurrencyCode(code: unknown): CurrencyCode | null {
   const validation = CurrencyCodeSchema.safeParse(code);
   if (!validation.success) {
      console.error(`Invalid currency code:`, printZodError(validation.error));
      return null;
   }
   return validation.data;
}
