import { useState } from 'react'
import blogServices from '../services/blogs'

const Blog = ({ blog, user, deleteButtonAction }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    border: '2px solid black',
    padding: '4px',
    marginBottom: '4px',
  }

  const likeButtonAction = async () => {
    blog.likes += 1
    const updatedBlog = await blogServices.updateBlog(blog, user.token)
    setLikes(updatedBlog.likes)
  }

  if (showDetails) {
    return (
      <div className="blog expanded" style={blogStyle}>
        <h4>
          {blog.title}, {blog.author}
        </h4>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.user.username.toString()}</p>
        <p>
          Likes: {likes}
          <button onClick={likeButtonAction}>Like</button>
        </p>
        <button
          className="hideButton"
          onClick={() => setShowDetails(!showDetails)}
        >
          Hide
        </button>
        <DeleteButton
          user={user}
          blog={blog}
          deleteButtonAction={deleteButtonAction}
        />
      </div>
    )
  }

  return (
    <div className="blog compact" style={blogStyle}>
      <h4>
        {blog.title}, {blog.author}
      </h4>
      <button
        className="viewButton"
        onClick={() => setShowDetails(!showDetails)}
      >
        View
      </button>
      <DeleteButton
        user={user}
        blog={blog}
        deleteButtonAction={deleteButtonAction}
      />
    </div>
  )
}

const DeleteButton = ({ user, blog, deleteButtonAction }) => {
  if (user.username === blog.user.username.toString()) {
    return <button onClick={() => deleteButtonAction(blog.id)}>Delete</button>
  }
  return null
}

export default Blog
