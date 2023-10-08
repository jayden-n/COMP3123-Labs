const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');

// Create new HTML file named home.html
// Add <h1> tag with the message "Welcome to ExpressJs Tutorial"
// Return home.html page to the client
router.get('/home', (req, res) => {
  const htmlContent = '<h1>Welcome to ExpressJs Tutorial</h1>';
  res.send(htmlContent);
});

// Return all details from user.json file to the client as JSON format
router.get('/profile', (req, res) => {
  // Read data from user.json file
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Parse the JSON data and send it as a response
    const userData = JSON.parse(data);
    res.json(userData);
  });
});

// Modify /login route to accept username and password as query string parameters
router.get('/login', (req, res) => {
  const { username, password } = req.query;

  // Read data from user.json file
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Parse the JSON data
    const userData = JSON.parse(data);

    // Check if username and password are valid
    if (userData.username === username && userData.password === password) {
      res.json({
        status: true,
        message: 'User Is valid',
      });
    } else if (userData.username !== username) {
      res.json({
        status: false,
        message: 'User Name is invalid',
      });
    } else {
      res.json({
        status: false,
        message: 'Password is invalid',
      });
    }
  });
});

// Modify /logout route to accept username as a parameter and display a message in HTML format
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  const htmlContent = `<b>${username} successfully logged out.</b>`;
  res.send(htmlContent);
});

app.use('/', router);

app.listen(process.env.PORT || 8081);

console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
