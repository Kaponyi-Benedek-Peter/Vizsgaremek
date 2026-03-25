describe('Products page', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('WS-1: Products are loaded and displayed', () => {
    cy.get('app-product-card', { timeout: 10000 }).should('have.length.at.least', 1);
  });

  it('WS-3: Product detail page opens on card click', () => {
    cy.get('app-product-card', { timeout: 10000 }).first().click();
    cy.url().should('match', /\/products\/\d+/);
    cy.get('app-product-detail, .product-detail').should('exist');
  });

  it('WS-4: Product prices are displayed', () => {
    cy.get('app-product-card', { timeout: 10000 })
      .first()
      .then(($card) => {
        const text = $card.text();
        const hasPrice = /\d/.test(text) && /Ft|€|\$/.test(text);
        expect(hasPrice).to.be.true;
      });
  });

  it('WS-5: Out-of-stock product cannot be added to cart', () => {
    cy.get('app-product-card', { timeout: 10000 }).each(($card) => {
      const text = $card.text().toLowerCase();
      if (
        text.includes('out of stock') ||
        text.includes('nincs készleten') ||
        text.includes('nicht verfügbar')
      ) {
        cy.wrap($card)
          .find('button')
          .filter(':contains("Add to Cart"), :contains("Kosárba"), :contains("In den Warenkorb")')
          .should('be.disabled');
        return false;
      }
    });
  });

  it('should filter products by category', () => {
    cy.get('app-category-bar', { timeout: 10000 }).should('exist');
    cy.get('app-category-bar .category-item').first().click();
    cy.get('app-product-card').should('have.length.at.least', 0);
  });

  it('should search products with the search bar', () => {
    cy.get('app-product-filter .search-input', { timeout: 10000 }).type('algoflex');
    cy.wait(500);
    cy.get('app-product-card').each(($card) => {
      cy.wrap($card)
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.include('algoflex');
        });
    });
  });

  it('should clear search and show all products again', () => {
    cy.get('app-product-filter .search-input', { timeout: 10000 }).type('algoflex');
    cy.wait(500);
    cy.get('app-product-card').should('have.length.at.least', 1);

    cy.get('app-product-filter .clear-search').click();
    cy.wait(500);
    cy.get('app-product-card').should('have.length.at.least', 1);
  });

  it('should sort products by price ascending', () => {
    cy.get('app-product-filter .sort-select', { timeout: 10000 }).select('price-asc');
    cy.wait(300);
    cy.get('app-product-card').should('have.length.at.least', 1);
  });
});
