import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NewBlogForm from "../NewBlogForm"

describe("New blog form is filled and ", () => {
  test("event handlers recive propper parameters", () => {
    const mockHandler = jest.fn()
    const { container } = render(<NewBlogForm createBlog={mockHandler} />)
    const inputs = screen.getAllByRole("textbox")
    const inputsEntries = [
      "This is a test",
      "Author Person",
      "absoluteValidLink.es",
    ]
    const btn = container.querySelector("button")
    inputs.forEach((input, i) => {
      userEvent.type(input, inputsEntries[i])
    })
    userEvent.click(btn)
    const inputContent = Object.values(mockHandler.mock.calls[0][0])

    expect(mockHandler.mock.calls).toHaveLength(1)
    inputsEntries.forEach((el, i) => {
      expect(inputContent[i]).toBe(el)
    })
  })
})
beforeEach(() => cleanup())
