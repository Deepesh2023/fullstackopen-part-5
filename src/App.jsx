import { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import getUser from './services/login';

import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import LoggedInUserInfo from './components/LoggedInUserInfo';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  });

  const blogFormRef = useRef();

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
      blogFormRef.current.hideFormAfterNewPost();
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
        <Togglable ref={blogFormRef}>
          <BlogForm user={user} addNewBlog={addNewBlog} />
        </Togglable>
        <BlogList blogs={blogs} token={user.token} />
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

export default App;
