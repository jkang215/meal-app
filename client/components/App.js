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
    this.showQuiz = this.showQuiz.bind(this);
    this.showHome = this.showHome.bind(this);
    this.showSuggestions = this.showSuggestions.bind(this);
    this.logout = this.logout.bind(this);
    this.state = this.getInitialState();
  }

  // Sends get request to grab initial state
  // ISSUE: ssid's aren't set so user always has to log in
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
            mealQuiz: false,
            suggestions: false,
            sTags: [],
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
            mealQuiz: false,
            suggestions: false,
            sTags: [],
          });
        }
      });
  }

  // Send post request to server to login, server responds with user data
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
              mealQuiz: false,
              suggestions: false,
              sTags: [],
            });
          } else {
            alert('Bad username/password combination');
          }
        });
    }
  }

  // Sets state to render the signup component
  switchToSignup() {
    const copy = Object.assign({}, this.state);
    copy.showSignup = true;
    this.setState(copy);
  }

  // Sends post request to server to create a new user in database
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
              mealQuiz: false,
              suggestions: false,
              sTags: [],
            });
          }
        });
    }
  }

  // Set state to render mealMenu
  showMealMenu() {
    const copy = Object.assign({}, this.state);
    copy.mealMenu = true;
    this.setState(copy);
  }

  // Set state to render quiz menu
  showQuiz() {
    if (this.state.mealList.length > 0) {
      const copy = Object.assign({}, this.state);
      copy.mealQuiz = true;
      this.setState(copy);
    } else {
      alert("You must add a meal first!");
    }
  }

  // Set state to render suggestions menu
  showSuggestions() {
    // Gather checkboxes that are selected
    const boxes = document.querySelectorAll('input');
    const checked = [];
    for (let i = 0; i < boxes.length; i += 1) {
      if (boxes[i].checked) checked.push(boxes[i].value);
    }
    if (boxes.length > 0 && checked.length > 0) {
      const copyState = Object.assign({}, this.state);
      copyState.suggestions = true;
      copyState.mealQuiz = false;
      copyState.mealMenu = false;
      copyState.sTags = checked;
      this.setState(copyState);
    } else {
      alert("You must select a tag first!");
    }
  }

  // Return state back to normal login values
  showHome() {
    const copy = Object.assign({}, this.state);
    copy.mealQuiz = false;
    copy.suggestions = false;
    copy.sTags = [];
    copy.mealMenu = false;
    this.setState(copy);
  }

  // Add meal to user and close meal menu
  addMeal() {
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
            mealQuiz: false,
            suggestions: false,
            sTags: [],
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
            mealMenu: false,
            mealQuiz: false,
            suggestions: false,
            sTags: [],
          });
        }
      });
  }

  render() {
    const { login, signup, switchToSignup, addMeal, showMealMenu, showQuiz, showSuggestions, showHome, logout } = this;
    console.log('rendering');
    if (this.state) {
      if (this.state.loggedIn) {
        // Render user info and meal list if logged in
        const { username, firstName, lastName, mealList, mealMenu, mealQuiz, suggestions, sTags } = this.state;
        return (
          <MealList 
            username={username}
            firstName={firstName}
            lastName={lastName}
            mealList={mealList}
            showMealMenu={showMealMenu}
            mealMenu={mealMenu}
            showQuiz={showQuiz}
            mealQuiz={mealQuiz}
            showSuggestions={showSuggestions}
            suggestions={suggestions}
            sTags={sTags}
            showHome={showHome}
            addMeal={addMeal}
            logout={logout}
          />
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
