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
    this.showMealMenu = this.showMealMenu.bind(this);
    this.logout = this.logout.bind(this);
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
            mealMenu: false,
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
            mealMenu: false,
          });
        }
      });
  }

  login() {
    // Grab username and password info from login element
    const un = document.getElementById('username-field').value;
    const pw = document.getElementById('password-field').value;
    if (un && pw) {
      fetch('http://localhost:3000/login/', {
        body: JSON.stringify({ username: un, password: pw }),
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
              mealMenu: false,
            });
          } else {
            alert('Bad username/password combination');
          }
        });
    }
  }

  switchToSignup() {
    const copy = Object.assign({}, this.state);
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
        body: JSON.stringify({ username: un, password: pw, firstName: fn, lastName: ln }),
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
              mealMenu: false,
            });
          }
        });
    }
  }

  showMealMenu() {
    const copy = Object.assign({}, this.state);
    copy.mealMenu = true;
    this.setState(copy);
  }

  addMeal() {
    // Add meal to user and close meal menu
    const mealTitle = document.getElementById('mTitle-field').value;
    const mealDescription = document.getElementById('mDescription-field').value;
    const mealTags = document.getElementById('mTags-field').value;

    if (mealTitle && mealDescription && mealTags) {
      const meal = {
        title: mealTitle,
        description: mealDescription,
        tags: mealTags.split(','),
      };
      console.log('meal:', meal);
      fetch('http://localhost:3000/info/' + this.state.username, {
        body: JSON.stringify(meal),
        headers: {
          'content-type': 'application/json',
        },
        method: 'PATCH',
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
            mealMenu: false,
          });
        });
    }
  }

  logout() {
    fetch('http://localhost:3000/logout/')
      .then(response => response.json())
      .then((myJson) => {
        if (!myJson.error) {
          this.setState({
            username: '',
            firstName: '',
            lastName: '',
            mealList: [],
            loggedIn: false,
            showSignup: false,
          });
        }
      });
  }

  render() {
    const { login, signup, switchToSignup, addMeal, showMealMenu, logout } = this;
    console.log('rendering');
    if (this.state) {
      if (this.state.loggedIn) {
        // Render user info and meal list
        const { username, firstName, lastName, mealList, mealMenu } = this.state;
        return (
          <div>
            <MealList username={username} firstName={firstName} lastName={lastName} mealList={mealList} showMealMenu={showMealMenu} mealMenu={mealMenu} addMeal={addMeal} logout={logout} />
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
