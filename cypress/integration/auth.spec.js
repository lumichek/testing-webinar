/* eslint-disable no-undef */
describe('check auth', () => {
  const email = '1@1.com';
  const password = '123';

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid=email_input]').type(`${email}{enter}`);
    cy.get('[data-testid=password_input]').type(`${password}{enter}`);
  });

  it('should show user name', () => {
    cy.get('.header__user').should('have.text', email);
  });

  it('should open modal after click on 1st element', () => {
    cy.get('ul li:first').first().click();
    cy.get('.popup__caption').should('exist');
  });

  it('should go to login page after logout', () => {
    cy.get('.header__logout').click();
    cy.get('.auth-form').should('exist');
  });
});