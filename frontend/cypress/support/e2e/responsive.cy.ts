describe('Responsive design', () => {
  const viewports: [string, number, number][] = [
    ['mobile', 375, 667],
    ['tablet', 768, 1024],
    ['desktop', 1280, 720],
  ];

  viewports.forEach(([name, width, height]) => {
    describe(`${name} (${width}x${height})`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.visit('/home');
      });

      it(`RS: Header is visible on ${name}`, () => {
        cy.get('app-header').should('be.visible');
      });

      it(`RS: Footer is visible on ${name}`, () => {
        cy.scrollTo('bottom');
        cy.get('app-footer').should('be.visible');
      });

      it(`RS: Products page renders on ${name}`, () => {
        cy.visit('/products');
        cy.get('app-product-list', { timeout: 10000 }).should('exist');
      });

      it(`RS: Forum page renders on ${name}`, () => {
        cy.visit('/forum');
        cy.get('.forum-page').should('exist');
      });
    });
  });

  it('RS-1: Mobile navigation menu works', () => {
    cy.viewport(375, 667);
    cy.visit('/home');

    cy.get('.hamburger-btn').should('be.visible').click();
    cy.get('.mobile-dropdown, .mobile-nav-item').should('be.visible');

    cy.get('.mobile-nav-item').contains('Products').click();
    cy.url().should('include', '/products');
  });

  it('RS-4: Product cards are usable on mobile', () => {
    cy.viewport(375, 667);
    cy.visit('/products');

    cy.get('app-product-card', { timeout: 10000 })
      .should('have.length.at.least', 1)
      .first()
      .should('be.visible')
      .click();
    cy.url().should('match', /\/products\/\d+/);
  });
});
