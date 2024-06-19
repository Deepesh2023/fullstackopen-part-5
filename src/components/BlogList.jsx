import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, user, likeBlog, deleteButtonAction }) => {
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <div className="blogs">
      <h1>blogs</h1>
      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Blog
              blog={blog}
              user={user}
              likeBlog={likeBlog}
              deleteButtonAction={deleteButtonAction}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

BlogList.prototype = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteButtonAction: PropTypes.func.isRequired,
}

export default BlogList
