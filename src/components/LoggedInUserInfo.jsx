const LoggedInUserInfo = ({ username, logOutUser }) => {
  return (
    <>
      <p>{username} is logged in</p>
      <button onClick={() => logOutUser()}>Logout</button>
    </>
  );
};

export default LoggedInUserInfo;
