function LoginMesage({ isLoggedIn }) {
  return (
    <div>{isLoggedIn ? <h1>Welcome Back!</h1> : <h1>Please Log in</h1>}</div>
  );
}

export default LoginMesage;
