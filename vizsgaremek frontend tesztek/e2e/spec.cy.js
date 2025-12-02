describe('template spec', () => {
     it('passes', () => {
       cy.visit('https://bstackdemo.com/')
       cy.get('#signin').click();
       cy.get('#username div.css-1hwfws3').click();
       cy.get('#react-select-2-option-0-0').click();
       cy.get('#password div.css-1hwfws3').click();
       cy.get('#react-select-3-option-0-0').click();
       cy.get('#login-btn').click();
       cy.get('#__next span.username').should('have.class', 'username');
       cy.get('#signin').should('have.text', 'Logout');
     });

     it('logoutTest', function() {
          cy.visit('https://bstackdemo.com/')
          cy.get('#signin').click();
          
          cy.get('#username svg.css-19bqh2r').click();
          cy.get('#react-select-2-option-0-0').click();
          cy.get('#username div.css-1uccc91-singleValue').should('have.text', 'demouser');
          cy.get('#password div.css-1hwfws3').click();
          cy.get('#react-select-3-option-0-0').click();
          cy.get('#password div.css-1uccc91-singleValue').should('have.text', 'testingisfun99');
          cy.get('#login-btn').click();
          cy.get('#__next span.username').should('have.text', 'demouser');
          cy.get('#signin').should('have.text', 'Logout');
          cy.get('#signin').click();
          cy.get('#signin').should('have.text', 'Sign In');
     });

     it('imageNotLoadUserLoginTest', function() {
          cy.visit('https://bstackdemo.com/')
          cy.get('#signin').click();
          cy.get('#username svg.css-19bqh2r').click();
          cy.get('#react-select-2-option-0-1').click();
          cy.get('#password svg.css-19bqh2r').click();
          cy.get('#react-select-3-option-0-0').click();
          cy.get('#login-btn').click();
          cy.get('#__next span.username').should('have.text', 'image_not_loading_user');
          cy.get('#__next div:nth-child(3) > div.shelf-item__thumb > img').should('have.attr', 'src', '');
     });

     it('existingorderuserLoginTest', function() {
          cy.visit('https://bstackdemo.com/')
          cy.get('#signin').click();
          cy.get('#username div.css-1hwfws3').click();
          cy.get('#react-select-2-option-0-2').click();
          cy.get('#username div.css-1uccc91-singleValue').should('have.text', 'existing_orders_user');
          cy.get('#password div.css-tlfecz-indicatorContainer').click();
          cy.get('#react-select-3-option-0-0').click();
          cy.get('#login-btn').click();
          cy.get('#__next span.username').should('have.text', 'existing_orders_user');
          
     });

     it('favuserLoginTest', function() {
             cy.visit('https://bstackdemo.com/')
             cy.get('#signin').click();
             cy.get('#username div.css-tlfecz-indicatorContainer').click();
             cy.get('#react-select-2-option-0-3').click();
             cy.get('#username div.css-1uccc91-singleValue').should('have.text', 'fav_user');
             cy.get('#password div.css-1hwfws3').click();
             cy.get('#react-select-3-option-0-0').click();
             cy.get('#login-btn').click();
             cy.get('#__next span.username').should('have.text', 'fav_user');
             cy.get('#__next div:nth-child(2) svg.Icon').should('have.attr', 'focusable', 'false');
             
     });

     it('lockeduserLoginTest', function() {
             cy.visit('https://bstackdemo.com/')
             cy.get('#signin').click();
             cy.get('#username svg.css-19bqh2r').click();
             cy.get('#react-select-2-option-0-4').click();
             cy.get('#username div.css-1uccc91-singleValue').should('have.text', 'locked_user');
             cy.get('#password svg.css-19bqh2r').click();
             cy.get('#react-select-3-option-0-0').click();
             cy.get('#login-btn').click();
             cy.get('#__next h3.api-error').should('have.text', 'Your account has been locked.');
             cy.get('#__next h3.api-error').should('be.visible');
             
     });

     it('demouserLoginFailTest', function() {
             cy.visit('https://bstackdemo.com/')
             cy.get('#signin').click();
             cy.get('#username svg.css-19bqh2r').click();
             cy.get('#react-select-2-option-0-0').click();
             cy.get('#username div.css-1uccc91-singleValue').should('have.text', 'demouser');
             cy.get('#login-btn').click();
             cy.get('#__next h3.api-error').should('have.text', 'Invalid Password');
             cy.get('#__next h3.api-error').should('be.visible');
             
     });
})