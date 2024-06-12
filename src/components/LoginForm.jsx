import { useState } from 'react';

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

export default LoginForm;
