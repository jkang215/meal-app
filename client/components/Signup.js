import React from 'react';

const Signup = (props) => {
  return (
    <form>
      <input id="username-field" name="username" type="text" placeholder="Username"></input>
      <input id="password-field" name="password" type="password" placeholder="Password"></input>
      <input id="firstName-field" name="firstName" type="text" placeholder="First Name"></input>
      <input id="lastName-field" name="lastName" type="text" placeholder="Last Name"></input>
      <button type='button' onClick={() => {props.signup()}}>Create User</button>
    </form>
  );
};

export default Signup;
