import { useState, useEffect, useSyncExternalStore } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import getUser from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loginUser = async (userObject) => {
    const loggedInUser = await getUser(userObject);
    setUser(loggedInUser);
  };

  if (user) {
    return BlogList(user.username, blogs);
  }

  return <LoginForm loginUser={loginUser} />;
};

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginButtonAction = (event) => {
    event.preventDefault();
    loginUser({ username, password });
  };

  return (
    <>
      <h2>Log into application</h2>
      <form onSubmit={loginButtonAction}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
};

const BlogList = (username, blogs) => {
  return (
    <div>
      <h1>blogs</h1>
      <p>{username} is logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
