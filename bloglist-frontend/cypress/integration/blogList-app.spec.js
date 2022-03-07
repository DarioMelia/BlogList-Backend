describe("Blog app", function () {
  beforeEach(function () {
    cy.resetDB()
    cy.newUser({
      username: "user",
      name: "Test User",
      password: "user",
    })
    cy.visit("http://localhost:3000")
  })
  it("Login form is shown", function () {
    cy.get("h2.title").should("contain", "Log In")
    cy.get("form.login-form").should("contain", "username")
  })
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.loginWithUI("user", "user")
      cy.contains("user logged in")
    })
    it("fails with wrong credentials", function () {
      cy.loginWithUI("user", "wrong")
      cy.get("div.error").should("have.css", "color", "rgb(255, 0, 0)")
    })
  })
  describe("When Logged in", function () {
    beforeEach(function () {
      cy.loginWithUI("user", "user")
    })
    it("a blog can be created", function () {
      cy.contains("New blog").click()
      cy.get("input[name='title']").type("Blog title")
      cy.get("input[name='author']").type("Blog author")
      cy.get("input[name='url'").type("someUrl.com")
      cy.contains("Add blog").click()
      cy.get(".blog-display").should("contain", "Blog title")
    })
  })
})
