import { useState } from 'react';
import blogServices from '../services/blogs';

const Blog = ({ blog, token }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    border: '2px solid black',
    padding: '4px',
    marginBottom: '4px',
  };

  const likeButtonAction = async () => {
    blog.likes += 1;
    const updatedBlog = await blogServices.updateBlog(blog, token);
    setLikes(updatedBlog.likes);
  };

  if (showDetails) {
    return (
      <div style={blogStyle}>
        <h4>
          {blog.title}, {blog.author}
        </h4>
        <p>{blog.url}</p>
        <p>{blog.user.username.toString()}</p>
        <p>
          Likes: {likes}
          <button onClick={likeButtonAction}>Like</button>
        </p>
        <button onClick={() => setShowDetails(!showDetails)}>Hide</button>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <h4>
        {blog.title}, {blog.author}
      </h4>
      <button onClick={() => setShowDetails(!showDetails)}>View</button>
    </div>
  );
};

export default Blog;
