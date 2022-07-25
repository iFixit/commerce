// Assert that when a user clicks the pagination buttons,
// the page scrolls back up.

describe('collections scroll', () => {
   const user = cy;
   beforeEach(() => {
      user.loadCollectionPageByPath('/Tools');
   });

   it('should scroll to the top of the page after clicking next page', () => {
      user.findByTestId('collections-search-box').should('be.visible');
      user.findByTestId('next-page').click();

      // Wait for the next page to be updated and scrolled to top.
      user.wait('@search');
      user.wait(3000);

      // When it scrolls to the top, the search bar should be visible
      user
         .window()
         .isWithinViewport(user.findByTestId('collections-search-box'));

      // Check that url parameter contains ?p after clicking next page
      user.location({ timeout: 2000 }).should((loc) => {
         expect(loc.search).to.have.string('?p=');
      });
   });
});

export {};
