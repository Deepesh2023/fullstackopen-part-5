import { useState, useEffect, useSyncExternalStore } from 'react';
import blogService from './services/blogs';
import getUser from './services/login';

import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import LoggedInUserInfo from './components/LoggedInUserInfo';

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
        <BlogForm user={user} userNotification={userNotification} />
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

export default App;
