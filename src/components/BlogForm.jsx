import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ user, userNotification }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const addNewBlog = async (newBlog) => {
    const token = user.token;
    try {
      const addedBlog = await blogService.addNew(newBlog, token);
      setBlogs(blogs.concat(addedBlog));
      userNotification('Blog added!', false);
    } catch (exception) {
      userNotification('Please fill in the correct fields', true);
    }
  };

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
