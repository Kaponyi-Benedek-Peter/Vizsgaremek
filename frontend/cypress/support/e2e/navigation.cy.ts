describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('PT-1: Home button redirects to home page', () => {
    cy.visit('/products');
    cy.get('app-header').contains('Home').click();
    cy.url().should('include', '/home');
    cy.get('.home').should('exist');
  });

  it('PT-2: Products button redirects to products page', () => {
    cy.get('app-header').contains('Products').click();
    cy.url().should('include', '/products');
    cy.get('app-product-list').should('exist');
  });

  it('PT-3: Forum button redirects to forum page', () => {
    cy.get('app-header').contains('Forum').click();
    cy.url().should('include', '/forum');
    cy.get('.forum-page').should('exist');
  });

  it('FO-1: Legal button redirects to legal page', () => {
    cy.get('app-footer').contains('Legal').click();
    cy.url().should('include', '/legal');
    cy.get('.legal-page').should('exist');
  });

  it('should show 404 page for unknown routes', () => {
    cy.visit('/this-does-not-exist', { failOnStatusCode: false });
    cy.get('app-not-found, .not-found').should('exist');
  });

  it('should scroll to top on navigation', () => {
    cy.visit('/products');
    cy.scrollTo('bottom');
    cy.get('app-header').contains('Forum').click();
    cy.window().its('scrollY').should('equal', 0);
  });
});
