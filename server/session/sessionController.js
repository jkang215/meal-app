const Session = require('./sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = (req, res, next) => {
  Session.find({ cookieId: req.cookies.ssid }, (err, sessions) => {
    if (err || !sessions[0]) {
      console.log('Not logged in! What are you doing?!');
      res.redirect('/signup');
    } else {
      next();
    }
  });
};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
*
*/
sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: res.locals.id }, (err) => {
    if (err) console.log('Session error', err);
    else console.log('Created session');
  });
  next();
};

sessionController.endSession = (req, res) => {
  Session.remove({ cookieId: req.cookies.ssid }, (err) => {
    if (err) {
      console.log('Did not remove SSID cookie');
    } else {
      console.log('Logging out');
      res.clearCookie('ssid');
      res.redirect('/');
    }
  });
};

module.exports = sessionController;
