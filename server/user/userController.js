const User = require('./userModel');

const userController = {};

/**
* getAllUsers
*
* @param next - Callback Function w signature (err, users)
*/
userController.getUser = (req, res) => {
  User.find({ username: req.params.username }, (err, found) => {
    if (err || !found) res.status(400).json({ error: 'Could not find username in database' });
    else res.json(found);
  });
};

/**
* createUser - create a new User model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
userController.createUser = (req, res, next) => {
  if (typeof req.body.username === 'string' && typeof req.body.password === 'string' && typeof req.body.firstName === 'string' && typeof req.body.lastName === 'string') {
    User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }, (err) => {
      if (err) {
        res.send(400).json({ error: 'Could not create user' });
      } else {
        console.log('Created a user');
        next();
      }
    });
  } else {
    res.status(400).json({ error: 'Badly formatted create request' });
  }
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
  if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
    User.findOne({ username: req.body.username }, (err, found) => {
      if (err || !found) {
        res.status(400).json({ error: 'Username not found in database' });
      } else if (found.comparePassword(req.body.password)) {
        console.log('found user/password');
        // Store found user data on res.locals
        res.locals.user = found;
        next();
      } else {
        res.status(400).json({ error: 'Password mismatch' });
      }
    });
  } else {
    res.status(400).json({ error: 'Badly formatted verify request' });
  }
};

userController.addMeal = (req, res) => {
  console.log('req params', req.params.username);
  if (req.body.title && req.body.description && req.body.tags) {
    User.findOne({ username: req.params.username }, (err, found) => {
      if (err || !found) {
        console.log('Patch error:', err);
        res.status(400).json({ error: 'Could not find user to update' });
      } else {
        found.meals.push(req.body);
        res.json(found);
      }
    });
  }
};

module.exports = userController;
