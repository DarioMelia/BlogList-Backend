// ***********************************************
Cypress.Commands.add("resetDB", () => {
  cy.request("POST", "http://localhost:5412/api/testing/reset")
})
Cypress.Commands.add("newUser", user => {
  cy.request("POST", "http://localhost:5412/api/users", user)
})
Cypress.Commands.add("loginWithUI", (username, password) => {
  cy.get("input[name='username']").type(username)
  cy.get("input[name='password']").type(password)
  cy.contains("login").click()
})
Cypress.Commands.add("newBlog", ({ title, author, url }) => {
  cy.contains("New blog").click()
  cy.get("input[name='title']").type(title)
  cy.get("input[name='author']").type(author)
  cy.get("input[name='url'").type(url)
  cy.contains("Add blog").click()
})
