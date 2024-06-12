import { useState } from 'react';

const BlogForm = ({ addNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  return (
    <>
      <h2>Create new</h2>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="author">author: </label>
        <input
          type="text"
          id="author"
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="url">url: </label>
        <input
          type="text"
          id="url"
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </div>

      <button onClick={() => addNewBlog(newBlog)}>Add blog</button>
    </>
  );
};

export default BlogForm;
