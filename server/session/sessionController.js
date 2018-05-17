const Session = require('./sessionModel');
const User = require('./../user/userModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.ssid }, (err, sessions) => {
    if (err || !sessions) {
      res.status(400).json({ error: 'Not logged in' });
    } else {
      User.findOne({ _id: req.cookies.ssid }, (err, found) => {
        if (err || !found) {
          res.status(400).json({ error: 'Could not find user ssid' });
        }
        else {
          res.json(found);
        }
      });
    }
  });
};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
*
*/
sessionController.startSession = (req, res) => {
  Session.create({ cookieId: res.locals.user._id }, (err) => {
    if (err) {
      res.json({ warning: 'Session already exists' });
    } else {
      // Created session: send back user data to client
      console.log('Created session');
      res.json(res.locals.user);
    }
  });
};

sessionController.endSession = (req, res) => {
  Session.remove({ cookieId: req.cookies.ssid }, (err) => {
    if (err) {
      console.log('Did not remove SSID cookie');
      res.status(400).json({ error: 'Could not remove session' });
    } else {
      console.log('Logging out');
      res.clearCookie('ssid');
      res.json({ success: 'Removed session cookie' });
    }
  });
};

module.exports = sessionController;
