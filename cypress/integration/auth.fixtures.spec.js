/* eslint-disable no-undef, testing-library/await-async-utils */
describe('check auth with fixtures', () => {
  const email = '1@1.com';
  const password = '123';

  beforeEach(() => {
    cy.intercept('GET', 'cards', {fixture: 'cards.json'});
    cy.intercept('POST', 'signin', {fixture: 'login.json'}).as('postLogin');
    cy.intercept('GET', 'me', {fixture: 'me.json'});
    cy.visit('http://localhost:3000/');
  });

  it('should login', () => {
    cy.get('[data-testid=email_input]').type(`${email}{enter}`);
    cy.get('[data-testid=password_input]').type(`${password}{enter}`);
    cy.wait('@postLogin').its('request.body').should('deep.equal', {
      email,
      password
    });
    cy.get('.header__user').should('have.text', email);
  });
});