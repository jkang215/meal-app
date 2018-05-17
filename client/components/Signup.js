import React from 'react';

const Signup = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-xs-8 col-centered">
          <h4>Sign Up!</h4>
          <p>Create your account here! No hacks allowed Shen Shen.</p>
          <form id="signup-form" className="form-horizontal">
            <div className="form-group">
              <label htmlFor="username-field">Username</label>
              <input id="username-field" className="form-control" name="username" type="text" placeholder="Username"></input>
            </div>
            <div className="form-group">
              <label htmlFor="password-field">Password</label>
              <input id="password-field" className="form-control" name="password" type="password" placeholder="Password"></input>
            </div>
            <div className="form-group">
              <label htmlFor="firstName-field">First Name</label>
              <input id="firstName-field" className="form-control" name="firstName" type="text" placeholder="First Name"></input>
            </div>
            <div className="form-group">
              <label htmlFor="lastName-field">Last Name</label>
              <input id="lastName-field" className="form-control" name="lastName" type="text" placeholder="Last Name"></input>
            </div>
            <button className="btn btn-primary" type='button' onClick={() => { props.signup() }}>Create User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
