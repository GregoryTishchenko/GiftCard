describe('Main', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/');
  });

  it('should proceed to payment step', () => {
    cy.fillFirstStep('100', 'EURO');

    // Verify accordion1 is hidden and accordion2 is visible
    cy.get('#accordion1').should('not.have.class', 'accordion--active');
    cy.get('#accordion2').should('have.class', 'accordion--active');
  });

  it('should proceed to payment on valid input', () => {
    cy.fillFirstStep('100', 'USD');
    cy.fillSecondStep('John Doe', 'john.doe@example.com', 'Test message for payment');

    // Validate success message block
    cy.get('#messageBloc').should('have.class', 'message--success');
    cy.get('#messageBloc').should('contain', 'We received your request');

    // Verify accordion2 body is hidden
    cy.get('#accordion2 .accordion__body').should('have.class', 'accordion__body--hidden');
  });

  it('should show error on invalid payment input', () => {
    cy.fillFirstStep('100', 'USD');
    cy.fillSecondStep('John Doe', 'john.doe@example', 'Another message for payment');

    // Validate error message block
    cy.get('#messageBloc').should('have.class', 'message--error');
    cy.get('#messageBloc').should('contain', 'Something went wrong');

    // Verify accordion2 body is hidden
    cy.get('#accordion2 .accordion__body').should('have.class', 'accordion__body--hidden');
  });

  it('should hide message block on click', () => {
    cy.fillFirstStep('100', 'USD');
    cy.fillSecondStep('John Doe', 'john.doe@example.com', 'Test message for payment');
    
    cy.get('#messageBloc').click();

    cy.get('#messageBloc').should('not.be.visible');
  });
});