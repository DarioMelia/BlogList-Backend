import { useState } from "react"
import Blog from "./Blog"
import Button from "./Button"
const Blogs = ({ blogs, blogProps }) => {
  const [toSort, setToSort] = useState(false)
  const sortedBlogs = [...blogs]
  sortedBlogs.sort((first, second) => {
    return second.likes - first.likes
  })

  const toggleSort = () => {
    setToSort(!toSort)
  }
  let blogsToDisplay

  toSort ? (blogsToDisplay = sortedBlogs) : (blogsToDisplay = blogs)
  return (
    <div className="blog-display">
      <Button
        onClick={toggleSort}
        text={toSort ? "Sort chronologically" : "Sort by likes"}
      />
      {blogsToDisplay.map(blog => (
        <Blog blogProps={blogProps} key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
export default Blogs
