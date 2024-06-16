// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillFirstStep', (amount, currency) => {
    cy.get('#amount').type('100');
    cy.get('#currency').select('USD');
    cy.get('#proceedToNextStep').click();
});

Cypress.Commands.add('fillSecondStep', (fullName, email, message) => {
    cy.get('#fullName').type(fullName);
    cy.get('#email').type(email);
    cy.get('#message').type(message);

    cy.get('#proceedToPayment').click();
});