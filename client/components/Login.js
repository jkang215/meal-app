import React from 'react';

const Login = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-xs-8 col-centered">
          <form id="login-form">
            <input id="username-field" name="username" type="text" placeholder="Username"></input>
            <input id="password-field" name="password" type="password" placeholder="Password"></input>
            <button type='button' onClick={() => { props.login() }}>Login</button>
          </form>
          <button onClick={() => { props.switchToSignup() }}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
