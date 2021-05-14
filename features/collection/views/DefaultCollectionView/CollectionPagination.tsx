import { Hit } from '@features/collection';
import {
   Pagination,
   PaginationButton,
   PaginationItem,
} from '@ifixit/react-components';
import { usePagination, useSearchResult } from '@libs/algolia';
import * as React from 'react';
import {
   HiChevronDoubleLeft,
   HiChevronDoubleRight,
   HiChevronLeft,
   HiChevronRight,
} from 'react-icons/hi';

export function CollectionPagination() {
   const searchResult = useSearchResult<Hit>();
   const [page, setPage] = usePagination();
   if (searchResult.numberOfPages <= 1) {
      return null;
   }
   return (
      <Pagination
         numberOfPages={searchResult.numberOfPages}
         page={page}
         onChange={setPage}
         pt={12}
         pb={8}
      >
         {(pagination) => (
            <>
               <PaginationItem>
                  <PaginationButton
                     aria-label="Go to first page"
                     page="first"
                     icon={HiChevronDoubleLeft}
                  />
               </PaginationItem>
               <PaginationItem>
                  <PaginationButton
                     aria-label="Go to previous page"
                     page="previous"
                     icon={HiChevronLeft}
                  />
               </PaginationItem>
               {pagination.pages.map((page) => (
                  <PaginationItem key={page}>
                     <PaginationButton
                        aria-label={
                           pagination.currentPage === page
                              ? 'current page'
                              : `go to page ${page}`
                        }
                        page={page}
                     />
                  </PaginationItem>
               ))}
               <PaginationItem>
                  <PaginationButton
                     aria-label="Go to next page"
                     page="next"
                     icon={HiChevronRight}
                  />
               </PaginationItem>
               <PaginationItem>
                  <PaginationButton
                     aria-label="Go to last page"
                     page="last"
                     icon={HiChevronDoubleRight}
                  />
               </PaginationItem>
            </>
         )}
      </Pagination>
   );
}
