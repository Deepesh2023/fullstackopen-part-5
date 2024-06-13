import { useCallback } from 'react'
import blogs from '../services/blogs'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, user, deleteButtonAction }) => {
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>blogs</h1>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          deleteButtonAction={deleteButtonAction}
        />
      ))}
    </div>
  )
}

BlogList.prototype = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteButtonAction: PropTypes.func.isRequired,
}

export default BlogList
