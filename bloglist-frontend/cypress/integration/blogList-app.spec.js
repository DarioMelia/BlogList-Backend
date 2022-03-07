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
    const blog = {
      title: "Blog Title",
      author: "Blog Author",
      url: "http//SomeUrl.com",
    }
    it("a blog can be created", function () {
      cy.newBlog(blog)
      cy.get(".blog-display").should("contain", blog.title)
    })
    it("pressing like button works properly", function () {
      cy.newBlog(blog)
      cy.get("button[name='toggle-info']").click()
      cy.get(".blog__likes").should("contain","0")
      cy.get("button[name='likes']").click()
      cy.get(".blog__likes").should("contain","1")
    })
    it("the user creator of the entrie is able to delete it",function () {
      cy.newBlog(blog)
      cy.get("button[name='toggle-info']").click()
      cy.get("button[name='del']").click()
      cy.get(".blog-display").contains(blog.title).should("not.exist")
    })
    it("a user can't delete and entrie that isn't his",function () {
      cy.newBlog(blog)
      cy.get("button[name='logout']").click()
      cy.newUser({
        username: "test",
        name: "Test Test",
        password: "test",
      })
      cy.loginWithUI("test","test")
      cy.get("button[name='toggle-info']").click()
      cy.get(".blog__info").should("not.contain","Remove")
    })
  })
})
