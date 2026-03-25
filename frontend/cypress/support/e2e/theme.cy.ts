describe('Theme switching (TH-1, TH-2, TH-3, TH-4, TH-5)', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.window().then((win) => win.localStorage.removeItem('selected-theme'));
  });

  function clickThemeToggle() {
    cy.get('[aria-label="Toggle theme"]').first().click();
  }

  it('TH-1: Light/dark mode toggle works', () => {
    cy.get('html').then(($html) => {
      const initialTheme = $html.attr('data-theme');
      clickThemeToggle();
      cy.get('html').should('have.attr', 'data-theme').and('not.equal', initialTheme);
    });
  });

  it('TH-2: Light mode applies correctly', () => {
    cy.get('html').invoke('attr', 'data-theme').then((theme) => {
      if (theme === 'dark') clickThemeToggle();
    });
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });

  it('TH-3: Dark mode applies correctly', () => {
    cy.get('html').invoke('attr', 'data-theme').then((theme) => {
      if (theme !== 'dark') clickThemeToggle();
    });
    cy.get('html').should('have.attr', 'data-theme', 'dark');
  });

  it('TH-4: Selected theme persists after page reload', () => {
    cy.get('html').invoke('attr', 'data-theme').then((theme) => {
      if (theme !== 'dark') clickThemeToggle();
    });
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    cy.reload();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
  });

  it('TH-5: Theme persists across page navigation', () => {
    cy.get('html').invoke('attr', 'data-theme').then((theme) => {
      if (theme !== 'dark') clickThemeToggle();
    });
    cy.get('html').should('have.attr', 'data-theme', 'dark');

    cy.get('app-header').contains('Products').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');

    cy.get('app-header').contains('Forum').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
  });
});
