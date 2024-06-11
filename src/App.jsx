import { useState, useEffect, useSyncExternalStore } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import getUser from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem('loggedInUser')) {
      const loggedInUser = JSON.parse(
        window.localStorage.getItem('loggedInUser')
      );
      setUser(loggedInUser);
    }
  }, []);

  const loginUser = async (userObject) => {
    const loggedInUser = await getUser(userObject);
    setUser(loggedInUser);
    window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  };

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

  const logOutUser = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
    userNotification('Logged out!', false);
  };

  const userNotification = (message, isError) => {
    setNotification({ message: message, isError: isError });
    setTimeout(() => {
      setNotification({ message: null, isError: false });
    }, 5000);
  };

  if (user) {
    return (
      <>
        <LoggedInUserInfo username={user.username} logOutUser={logOutUser} />
        <Notification notification={notification} />
        <NewBlogForm addNewBlog={addNewBlog} />
        <BlogList blogs={blogs} />
      </>
    );
  }

  return (
    <>
      <Notification notification={notification} />
      <LoginForm loginUser={loginUser} userNotification={userNotification} />
    </>
  );
};

const LoginForm = ({ loginUser, userNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginButtonAction = async (event) => {
    event.preventDefault();
    try {
      await loginUser({ username, password });
      userNotification('Logged in!', false);
    } catch (exception) {
      console.log(exception.response.data.error);
      userNotification(exception.response.data.error, true);
    }
  };

  return (
    <>
      <h2>Log into application</h2>
      <form onSubmit={loginButtonAction}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h1>blogs</h1>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const LoggedInUserInfo = ({ username, logOutUser }) => {
  return (
    <>
      <p>{username} is logged in</p>
      <button onClick={() => logOutUser()}>Logout</button>
    </>
  );
};

const NewBlogForm = ({ addNewBlog }) => {
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

const Notification = ({ notification }) => {
  if (notification.message) {
    const styles = {
      height: '50px',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
    };

    if (notification.isError) {
      styles['border'] = '8px solid red';
      styles['background-color'] = '#f48b95';
    } else {
      styles['border'] = '8px solid green';
      styles['background-color'] = '#8cf78e';
    }
    return (
      <div style={styles}>
        <h3>{notification.message}</h3>
      </div>
    );
  }
};

export default App;
