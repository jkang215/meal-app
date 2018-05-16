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
        // No matching ssid session
        if (myJson.error) {
          console.log('errored');
          this.setState({
            username: '',
            firstName: '',
            lastName: '',
            mealList: [],
            loggedIn: false,
            showSignup: false,
          });
        } else {
          // Found session match
          this.setState({
            username: myJson.username,
            firstName: myJson.firstName,
            lastName: myJson.lastName,
            mealList: myJson.meals,
            loggedIn: true,
            showSignup: false,
          });
        }
      });
  }

  login() {
    // Grab username and password info from login element
    const un = document.getElementById('username-field').value;
    const pw = document.getElementById('password-field').value;
    if (un && pw) {
      const bod = { username: un, password: pw };
      console.log('bod', bod);
      fetch('http://localhost:3000/login/', {
        body: JSON.stringify(bod),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(response => response.json())
        .then((myJson) => {
          if (!myJson.error) {
            this.setState({
              username: myJson.username,
              firstName: myJson.firstName,
              lastName: myJson.lastName,
              mealList: myJson.meals,
              loggedIn: true,
              showSignup: false,
            });
          } else {
            alert('Bad username/password combination');
          }
        });
    }
  }

  switchToSignup() {
    let copy = Object.assign({}, this.state);
    copy.showSignup = true;
    this.setState(copy);
  }

  signup() {
    const un = document.getElementById('username-field').value;
    const pw = document.getElementById('password-field').value;
    const fn = document.getElementById('firstName-field').value;
    const ln = document.getElementById('lastName-field').value;

    if (un && pw && fn && ln) {
      fetch('http://localhost:3000/signup/', {
        body: { username: un, password: pw, firstName: fn, lastName: ln },
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(response => response.json())
        .then((myJson) => {
          if (!myJson.error) {
            this.setState({
              username: myJson.username,
              firstName: myJson.firstName,
              lastName: myJson.lastName,
              mealList: myJson.meals,
              loggedIn: true,
              showSignup: false,
            });
          }
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
      } else if (this.state.showSignup) {
        // Render signup component
        return (
          <div>
            <Signup signup={signup} />
          </div>
        );
      }
      // Render login component
      console.log('login rendered');
      return (
        <div>
          <Login login={login} switchToSignup={switchToSignup} />
        </div>
      );
    }
    // State still fetching
    return (
      <span>Loading...</span>
    );
  }
}

export default App;
