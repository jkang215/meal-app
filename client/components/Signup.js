import React from 'react';

const Signup = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-xs-8 col-centered">
          <h4>Sign Up!</h4>
          <p>Create your account here! No hacks allowed Shen Shen.</p>
          <form id="signup-form">
            <input id="username-field" name="username" type="text" placeholder="Username"></input>
            <input id="password-field" name="password" type="password" placeholder="Password"></input>
            <input id="firstName-field" name="firstName" type="text" placeholder="First Name"></input>
            <input id="lastName-field" name="lastName" type="text" placeholder="Last Name"></input>
            <button type='button' onClick={() => { props.signup() }}>Create User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
