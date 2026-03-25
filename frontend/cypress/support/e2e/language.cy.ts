describe('Language switching', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.window().then((win) => win.localStorage.removeItem('selectedLanguage'));
  });

  it('LA-1: English version loads correctly', () => {
    selectLanguage('English');
    cy.get('app-header').should('contain.text', 'Home');
    cy.get('app-header').should('contain.text', 'Products');
    cy.get('app-header').should('contain.text', 'Forum');
  });

  it('LA-2: Hungarian version loads correctly', () => {
    selectLanguage('Magyar');
    cy.get('app-header').should('contain.text', 'Kezdőlap');
    cy.get('app-header').should('contain.text', 'Termékek');
    cy.get('app-header').should('contain.text', 'Fórum');
  });

  it('LA-3: German version loads correctly', () => {
    selectLanguage('Deutsch');
    cy.get('app-header').should('contain.text', 'Startseite');
    cy.get('app-header').should('contain.text', 'Produkte');
    cy.get('app-header').should('contain.text', 'Forum');
  });

  it('LA-4: Selected language persists after page reload', () => {
    selectLanguage('Magyar');
    cy.get('app-header').should('contain.text', 'Kezdőlap');

    cy.reload();

    cy.get('app-header').should('contain.text', 'Kezdőlap');
    cy.get('app-header').should('contain.text', 'Termékek');
  });

  it('LA-5: Selected language persists across page navigation', () => {
    selectLanguage('Deutsch');
    cy.get('app-header').should('contain.text', 'Produkte');

    cy.get('app-header').contains('Produkte').click();
    cy.get('app-header').should('contain.text', 'Startseite');

    cy.get('app-header').contains('Forum').click();
    cy.get('app-header').should('contain.text', 'Startseite');
  });
});

function selectLanguage(name: string): void {
  cy.get('app-language-switcher').click();
  cy.contains(name).click();
  cy.wait(300);
}
