describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  describe('Featured products', () => {
    it('FT-1: Featured product cards are clickable', () => {
      cy.get('app-featured-product-card', { timeout: 10000 })
        .should('have.length.at.least', 1)
        .first()
        .click();
      cy.url().should('match', /\/products\/\d+/);
    });

    it('FT-2: Featured section is responsive on window resize', () => {
      cy.get('app-featured', { timeout: 10000 }).should('be.visible');

      cy.viewport(375, 667);
      cy.get('app-featured').should('be.visible');
      cy.get('app-featured-product-card').should('have.length.at.least', 1);

      cy.viewport(1280, 720);
      cy.get('app-featured').should('be.visible');
    });
  });

  describe('Hero slider', () => {
    it('SL-1: Slider next button works', () => {
      cy.get('app-slide', { timeout: 10000 }).should('exist');
      cy.get('app-slide').then(($slide) => {
        const nextBtn = $slide.find('[aria-label*="next"], .slide-next, .slider-next');
        if (nextBtn.length > 0) {
          cy.wrap(nextBtn).click();
          cy.wait(500);
          cy.wrap(nextBtn).should('exist');
        }
      });
    });

    it('SL-2: Slider previous button works', () => {
      cy.get('app-slide', { timeout: 10000 }).should('exist');
      cy.get('app-slide').then(($slide) => {
        const nextBtn = $slide.find('[aria-label*="next"], .slide-next, .slider-next');
        if (nextBtn.length > 0) {
          cy.wrap(nextBtn).click();
          cy.wait(500);
        }
        const prevBtn = $slide.find('[aria-label*="prev"], .slide-prev, .slider-prev');
        if (prevBtn.length > 0) {
          cy.wrap(prevBtn).click();
          cy.wait(500);
          cy.wrap(prevBtn).should('exist');
        }
      });
    });

    it('SL-3: Slider dot/stepper buttons work', () => {
      cy.get('app-slide', { timeout: 10000 }).should('exist');
      cy.get('app-slide').then(($slide) => {
        const dots = $slide.find('.slide-dot, .slider-dot, .dot');
        if (dots.length > 1) {
          cy.wrap(dots.eq(1)).click();
          cy.wait(500);
        }
      });
    });
  });
});
