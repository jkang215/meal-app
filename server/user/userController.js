const User = require('./userModel');
const cookieController = require('./../util/cookieController');
const sessionController = require('./../session/sessionController');
const querystring = require('querystring');
const request = require('request');

const userController = {};

/**
* getAllUsers
*
* @param next - Callback Function w signature (err, users)
*/
userController.getAllUsers = (next) => {
  User.find({}, next);
};

/**
* createUser - create a new User model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
userController.createUser = (req, res, next) => {
  if (res.locals.token) {
    const getUserData = new Promise((resolve, reject) => {
      request.get({
        headers: {
          'User-Agent': 'wilbur.io',
        },
        url: `https://api.github.com/user?access_token=${res.locals.token}`,

      }, (err, response) => {
        if (err) console.log('Could not get user data github');
        else {
          resolve(JSON.parse(response.body));
        }
      });
    }).then((userInfo) => {
      User.create({ username: userInfo.login, password: JSON.stringify(userInfo.id) }, (err) => {
        if (err) console.log('Could not create user dude!  ', err);
        else console.log('Created a user');
      });

      res.locals.username = userInfo.login;
      res.locals.password = JSON.stringify(userInfo.id);

      next();
    });
  }
  else if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
    User.create({ username: req.body.username, password: req.body.password }, (err) => {
      if (err) console.log('Could not create user dude! The user already exists if script continued...');
      else console.log('Created a user');
    });
    next();
  } else {
    res.render(__dirname + './../../client/signup.ejs', { error: 'mongoose error brah' });
  }
};

userController.getCodeAndPost = (req, res, next) => {
  // Get code from req URL
  let githubCode = querystring.parse(req.url, '?').code;
  // Post code back to GitHub with promise
  const githubPost = new Promise((resolve, reject) => {
    request.post('https://github.com/login/oauth/access_token?client_id=2115c135ac2bbf07cd48&client_secret=7df60cf436491300c55446bc60a736d33f8a7f1a&code=' + githubCode, (err, response) => {
      if (err) console.log('Could not post code to github');
      else {
        // Receive token from GitHub
        resolve(response.body);
      }
    });
  }).then((tokenstring) => {
    res.locals.token = querystring.parse(tokenstring).access_token;
    console.log('res.locals.token', res.locals.token);
    next();
  });
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
userController.verifyUser = (req, res, next) => {
  // verify github oauth user
  if (res.locals.token) {
    User.findOne({ username: res.locals.username }, (err, users) => {
      if (err || !users) {
        console.log('Not finding anything breh');
        res.redirect('/signup');
      } else {
        console.log('found user/password');
        res.locals.id = users._id;
        return next();
      }
    });
  } else if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
    // verify normal login
    User.findOne({ username: req.body.username }, (err, users) => {
      if (err || !users) {
        console.log('Not finding anything breh');
        res.redirect('/signup');
      } else {
        if (users.comparePassword(req.body.password)) {
          console.log('found user/password');
          res.locals.id = users._id;
          return next();
        } else {
          console.log('Wrong password! Geez');
          res.redirect('/');
        }
      }
    });
  } else {
    console.log('Badly formatted user');
    res.redirect('/signup');
  }
};

module.exports = userController;
