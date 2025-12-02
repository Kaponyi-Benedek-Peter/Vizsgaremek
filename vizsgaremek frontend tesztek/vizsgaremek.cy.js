// Adatok
const email = "bp.kaponyi@gmail.com";
const password = "Almacsutka_12Rágcsa_01";

// Link bekérése
const askForLink = (message) => {
  return cy
    .task("askForInput", message)
    .then((link) => link.trim());
};

describe("Registration", () => {
  it("should register and be activated manually", () => {

    cy.visit("http://127.0.0.1:5500/webshop/registration.html");

    cy.get("#email").type(email);

    cy.get("#password").type(password);

    cy.get("#registerBtn").click();

    // MANUÁLIS LÉPÉS!
    // 1. Email megnyitás
    // 2. Link
    // 3. Link végéről paraméter beillesztés
    askForLink("Add meg az aktiváló link végét (?activate=...)")
      .then((activationLink) => {

        cy.visit("http://127.0.0.1:5500/webshop/index.html" + activationLink);

        // Ellenőrzés
        cy.get(".result")
          .should("contain", "Registration succesful!");
      });
  });
});

describe("Delete Account", () => {
  it("should delete account with manual confirmation link", () => {

    cy.visit("http://127.0.0.1:5500/webshop/delete_acc.html");

    cy.get("#pass").type(password);

    cy.get("#deleteBtn").click();

    // MANUÁLIS LÉPÉS!
    askForLink("Add meg az account delete link végét (?accdel=...)")
      .then((deleteLink) => {

        cy.visit("http://127.0.0.1:5500/webshop/index.html" + deleteLink);

        // Ellenőrzés
        cy.get(".result")
          .should("contain", "Your account has been successfully deleted!");
      });
  });
});

describe('Registration', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/webshop/registration.html')
  })
});
describe('Login', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/webshop/login.html')
  })
});
describe('Products', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/webshop/products.html')
  })
});
describe('Profile', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/webshop/profile.html')
  })
});
describe('Legal', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/webshop/legal.html')
  })
});
describe('Index', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/webshop/index.html')
  })
});
describe('Bracket', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/webshop/bracket.html')
  })
});
describe('Change_Password', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/webshop/change_pass.html')
  })
});
describe('Delete_Account', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/webshop/delete_acc.html')
  })
});