describe('Authentication guards', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.window().then((win) => {
      win.localStorage.removeItem('auth_token');
      win.sessionStorage.removeItem('auth_token');
      win.localStorage.removeItem('user_id');
      win.sessionStorage.removeItem('user_id');
    });
  });

  it('AU-3: Unauthorized user is redirected from profile page', () => {
    cy.visit('/profile');
    cy.url().should('include', '/login');
  });

  it('AU-3: Unauthorized user is redirected from purchase page', () => {
    cy.visit('/purchase');
    cy.url().should('include', '/login');
  });

  it('AU-3: Unauthorized user is redirected from admin page', () => {
    cy.visit('/admin');
    cy.url().should('satisfy', (url: string) => url.includes('/login') || url.includes('/home'));
  });

  it('should allow access to public pages without auth', () => {
    cy.visit('/home');
    cy.url().should('include', '/home');

    cy.visit('/products');
    cy.url().should('include', '/products');

    cy.visit('/forum');
    cy.url().should('include', '/forum');

    cy.visit('/legal');
    cy.url().should('include', '/legal');
  });
});
