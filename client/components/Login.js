import React from 'react';

const Login = (props) => {
  return (
    <div>
      <form>
        <input id="username-field" name="username" type="text" placeholder="Username"></input>
        <input id="password-field" name="password" type="password" placeholder="Password"></input>
        <button type='button' onClick={() => {props.login()}}>Login</button>
      </form>
      <button onClick={() => {props.switchToSignup()}}>Sign Up</button>
    </div>
  );
};

export default Login;
