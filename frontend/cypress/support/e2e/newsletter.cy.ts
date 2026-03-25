describe('Newsletter subscription', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.scrollTo('bottom');
  });

  it('NL-1: Newsletter form is visible in footer', () => {
    cy.get('app-newsletter-form, .newsletter-form').should('be.visible');
    cy.get('app-newsletter-form input[type="email"], .newsletter-form input').should('exist');
  });

  it('NL-3: Newsletter shows error on invalid email', () => {
    cy.get('app-newsletter-form input[type="email"], .newsletter-form input')
      .clear()
      .type('not-an-email');
    cy.get('app-newsletter-form button[type="submit"], .newsletter-form button')
      .click();
    cy.wait(500);
    cy.get('app-toast, .toast').should('exist');
  });
});
