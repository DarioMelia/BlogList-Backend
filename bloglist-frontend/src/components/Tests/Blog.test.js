import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "../Blog"

const blog = {
  author: "Fulanito Perez",
  likes: 3,
  title: "Test blog",
  url: "http://rialLink.com",
  user: {
    username: "Sariak",
    name: "Sara Alvarez",
    id: "621e083c5faf16fac32734a4",
  },
}

const blogProps = {
  user: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhcmlhayIsImlkIjoiNjIxZTA4M2M1ZmFmMTZmYWMzMjczNGE0IiwiaWF0IjoxNjQ2MTU3ODUzfQ.iPULRQw0RCgjhKGvmjXThiPrnGS_E60y-qT6jmSK8To",
    username: "Sariak",
    name: "Sara Alvarez",
  },
  updateBlog: () => jest.fn(),
  deleteBlog: () => jest.fn(),
}

describe("Blog components renders and", () => {
  test("displays title", () => {
    render(<Blog blog={blog} blogProps={blogProps} />)
    const element = screen.getByText(blog.title)
    expect(element).toBeDefined()
  })
  test("does not display url or likes by default", () => {
    const { container } = render(<Blog blog={blog} blogProps={blogProps} />)
    const link = container.querySelector(".blog__link")
    const likes = container.querySelector(".blog__likes")
    expect(link).toBeNull()
    expect(likes).toBeNull()
  })
  test("does display url, likes and author when 'show' is clicked", () => {
    const { container } = render(<Blog blog={blog} blogProps={blogProps} />)
    const btn = screen.getByText("show")
    userEvent.click(btn)
    const link = container.querySelector(".blog__link")
    const likes = container.querySelector(".blog__likes")
    const author = container.querySelector(".blog__author")
    expect(link).not.toBeNull()
    expect(likes).not.toBeNull()
    expect(author).not.toBeNull()
  })
  test("if like button is pressed twice, handler is called accordingly", () => {
    const mockHandler = jest.fn()
    blogProps.updateBlog = mockHandler
    const { container } = render(<Blog blog={blog} blogProps={blogProps} />)
    const btn = screen.getByText("show")
    userEvent.click(btn)
    const likesBtn = container.querySelector(".blog__likes button")
    userEvent.click(likesBtn)
    userEvent.click(likesBtn)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

beforeEach(() => cleanup())
