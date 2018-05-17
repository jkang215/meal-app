import React from 'react';

const Login = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-xs-8 col-centered">
          <h4>Welcome to the Meal App!</h4>
          <p>Login here. If you're new, click Sign Up to get started!</p>
          <form id="login-form" className="form-horizontal">
            <div className="form-group">
              <label htmlFor="username-field">Username</label>
              <input id="username-field" className="form-control" name="username" type="text" placeholder="Username"></input>
            </div>
            <div className="form-group">
              <label htmlFor="password-field">Password</label>
              <input id="password-field" className="form-control" name="password" type="password" placeholder="Password"></input>
            </div>
            <button className="btn btn-default" type='button' onClick={() => { props.login() }}>Login</button>
          </form>
          <button className="btn btn-primary" onClick={() => { props.switchToSignup() }}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
