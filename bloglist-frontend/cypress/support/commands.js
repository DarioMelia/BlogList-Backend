// ***********************************************
Cypress.Commands.add("resetDB", () => {
  cy.request("POST", "http://localhost:5412/api/testing/reset")
})
Cypress.Commands.add("newUser", user => {
  cy.request("POST", "http://localhost:5412/api/users", user)
})
