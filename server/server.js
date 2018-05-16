const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const userController = require('./user/userController.js');
const sessionController = require('./session/sessionController.js');
const cookieController = require('./util/cookieController.js');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/meal-app');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname +'./../'));

// Serve home page
app.get('/', (req, res) => {
  res.render('index.html');
});
// Route that will check for an active session on initial render
app.get('/logged', sessionController.isLoggedIn);

// Create user in database
app.post('/signup', userController.createUser, userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession); // Note: could change server flow to avoid verifying after creating

// Login and serve home page
app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession);

// Route for adding a meal to a user
app.patch('/info/:username', userController.addMeal);

/**
* logout
*/
app.use('/logout', sessionController.endSession);

// Get a user from the database
// localhost://3000/"username"
// app.post('/info', userController.getUser);

// Delete a student from the database
// localhost://3000/student/"name"
// router.delete('/:username', );

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
