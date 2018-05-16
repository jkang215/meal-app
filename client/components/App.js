import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import MealList from './MealList';


class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.switchToSignup = this.switchToSignup.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.state = this.getInitialState();
  }
  
  getInitialState() {
    fetch('http://localhost:3000/logged/')
      .then(response => response.json())
      .then((myJson) => {
        console.log('fetching');
        // No matching ssid session
        if (myJson.hasOwnProperty('error')) {
          this.setState({
            username: '',
            firstName: '',
            lastName: '',
            mealList: [],
            loggedIn: false,
            showSignup: false,
          });
        }
        // Found session match
        this.setState({
          username: myJson.username,
          firstName: myJson.firstName,
          lastName: myJson.lastName,
          mealList: myJson.meals,
          loggedIn: true,
          showSignup: false,
        });
      });
  }

  login() {
    // Grab username and password info from login element
    const un = document.getElementById('username-field').value;
    const pw = document.getElementById('password-field').value;
    if (un && pw) {
      fetch('http://localhost:3000/login/', {
        body: JSON.stringify({ username: un, password: pw }),
        method: 'POST',
      })
        .then(response => response.json())
        .then((myJson) => {
          this.setState({
            username: myJson.username,
            firstName: myJson.firstName,
            lastName: myJson.lastName,
            mealList: myJson.meals,
            loggedIn: true,
            showSignup: false,
          });
        });
    }
  }

  switchToSignup() {
    this.setState(Object.assign(this.state, { showSignup: true }));
  }

  signup() {
    const un = document.getElementById('username-field').value;
    const pw = document.getElementById('password-field').value;
    const fn = document.getElementById('firstName-field').value;
    const ln = document.getElementById('lastName-field').value;

    if (un && pw && fn && ln) {
      fetch('http://localhost:3000/signup/', {
        body: JSON.stringify({ username: un, password: pw, firstName: fn, lastName: ln }),
        method: 'POST',
      })
        .then(response => response.json())
        .then((myJson) => {
          this.setState({
            username: myJson.username,
            firstName: myJson.firstName,
            lastName: myJson.lastName,
            mealList: myJson.meals,
            loggedIn: true,
            showSignup: false,
          });
        });
    }
  }

  addMeal() {
    // Render menu to add a meal
  }

  render() {
    const { login, signup, switchToSignup, addMeal } = this;
    console.log('rendering');
    if (this.state) {
      if (this.state.loggedIn) {
        // Render user info and meal list
        const { username, firstName, lastName, mealList } = this.state;

        return (
          <div>
            <MealList mealList={mealList} addMeal={addMeal} />
          </div>
        );
      } else if (this.state.showSignUp) {
        // Render signup component
        return (
          <div>
            <Signup signup={signup} />
          </div>
        );
      }
      // Render login component
      return (
        <div>
          <Login login={login} switchToSignup={switchToSignup} />
        </div>
      );
    }
    return (
      <span>Loading...</span>
    );
  }
}

export default App;
