import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    border: '2px solid black',
    padding: '4px',
    marginBottom: '4px',
  };

  if (showDetails) {
    return (
      <div style={blogStyle}>
        <h4>{blog.title}</h4>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
        <p>
          Likes: {blog.likes}
          <button>Like</button>
        </p>
        <button onClick={() => setShowDetails(!showDetails)}>Hide</button>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <h4>{blog.title}</h4>
      <button onClick={() => setShowDetails(!showDetails)}>View</button>
    </div>
  );
};

export default Blog;
