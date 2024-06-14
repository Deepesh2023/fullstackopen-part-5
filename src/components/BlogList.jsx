import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, user, deleteButtonAction }) => {
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>blogs</h1>
      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Blog
              blog={blog}
              user={user}
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
