export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export function capitalize(text: string): string {
   return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export function assertNever(x: never): never {
   throw new Error('Unexpected object: ' + x);
}

export interface GetResizedImageInput {
   src: string;
   width: number;
}

export function getResizedImage({ src, width }: GetResizedImageInput) {
   const match = src.match(/^(https:\/\/cdn.shopify.com.+)\.(jpg|png)\?(.+)/);
   if (match == null) {
      return src;
   }
   const [fullSrc, baseSrc, extension, query] = match;
   return `${baseSrc}_${width}x.${extension}?${query}`;
}

export function filterNullableItems<I>(
   items?: I[] | undefined | null
): NonNullable<I>[] {
   return (items?.filter((item) => item != null) as any) || [];
}
