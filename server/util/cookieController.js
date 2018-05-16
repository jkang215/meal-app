const cookieController = {};
cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;

/**
* setCookie - set a cookie with a random number
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
function setCookie(req, res, next) {
  res.cookie('codesmith', 'hi');
  res.cookie('secret', JSON.stringify(Math.floor(Math.random() * 100)));
  next();
}

/**
* setSSIDCookie - store the supplied id in a cookie
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
function setSSIDCookie(req, res, next) {
  console.log('Setting cookie', res.locals.user._id);
  res.cookie('ssid', res.locals.user._id, { httpOnly: true });
  next();
}

module.exports = cookieController;
