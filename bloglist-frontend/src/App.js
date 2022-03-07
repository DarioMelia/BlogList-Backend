import React, { useState, useEffect, useRef } from "react"
//Services
import blogService from "./services/blogs"
import loginService from "./services/login"
//Styles
import "./index.css"
//COMPONENTS
import Notification from "./components/Notification"
import Button from "./components/Button"
import Title from "./components/Title"
import LogInForm from "./components/LogInForm"
import Blogs from "./components/Blogs"
import NewBlogForm from "./components/NewBlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  //Notification States
  const [notMsg, setNotMsg] = useState(null)
  const [isErr, setIsErr] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    async function fetch() {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    fetch()
  }, [])
  useEffect(() => {
    const blogListUser = window.localStorage.getItem("blogListUser")
    if (blogListUser) {
      const user = JSON.parse(blogListUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  ///EVENT HANDLERS

  const logIn = async userforLogIn => {
    try {
      const user = await loginService.login(userforLogIn)
      window.localStorage.setItem("blogListUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notify(false, `${user.username} succesfully logged in`)
    } catch (err) {
      notify(true, "Invalid username or password")
    }
  }
  const logOut = () => {
    window.localStorage.removeItem("blogListUser")
    notify(false, `Goodbye, ${user.username}!`)
    setUser(null)
  }
  const createBlog = async newBlog => {
    try {
      const addedBlog = await blogService.addBlog(newBlog)
      const finalBlogs = await blogService.getAll()
      setBlogs(finalBlogs)
      notify(
        false,
        `"${addedBlog.title.substring(0, 30)}..." succesfully added`
      )
      blogFormRef.current.toggleVisibility()
    } catch (err) {
      const errStatus = err.message.slice(-3)
      errStatus === "400"
        ? notify(true, "Invalid url, title or author is missing")
        : notify(true, "Oops! Something went wrong")
    }
  }

  const updateBlog = async blogToUpdate => {
    try {
      const updatedBlog = await blogService.updateBlog(blogToUpdate)
      const finalBlogs = await blogService.getAll()
      setBlogs(finalBlogs)
      notify(false, `"${updatedBlog.title}" updated`)
    } catch (err) {
      notify(true, err.message)
    }
  }

  const deleteBlog = async id => {
    try {
      await blogService.deleteBlog(id)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } catch (err) {
      console.error(err.message)
      notify(true, err.message)
    }
  }

  ///HTML GENERATORS
  const logInForm = () => <LogInForm logIn={logIn}></LogInForm>
  const blogList = () => {
    const blogProps = { user, updateBlog, deleteBlog }
    return (
      <>
        {user.username} logged in{" "}
        <Button onClick={logOut} text="logout" name="logout"></Button>
        <br></br>
        <Togglable btnLabel="New blog" ref={blogFormRef}>
          <NewBlogForm createBlog={createBlog}></NewBlogForm>
        </Togglable>
        <hr></hr>
        <Blogs blogs={blogs} blogProps={blogProps}></Blogs>
      </>
    )
  }

  //Helpers
  function resetNot() {
    setTimeout(() => setNotMsg(null), 5000)
  }
  function notify(isErr, msg) {
    setIsErr(isErr)
    setNotMsg(msg)
    resetNot()
  }

  ///%%%%%%%%%%%%%%%%RETURN JSX%%%%%%%%%%%%%%%%%%%%%
  return (
    <div>
      <Notification msg={notMsg} isErr={isErr}></Notification>
      <Title user={user}></Title>
      {user === null ? logInForm() : blogList()}
    </div>
  )
}

export default App
