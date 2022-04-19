// import express
const express = require('express');

// create our express app
const app = express();

// we use this below instead of body parser and will need to add this below our express app in most cases
app.use(express.json());

// - Create a mock database because we haven't learned how to create a proper one yet
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0, // number of times the user has uploaded a picture
      joined: new Date(), // creates a new date when the user is created - a built-in js function
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
  ],
}; // our database is an object containing the value users which is an array of objects containing all our user data

app.get('/', (req, res) => {
  res.send(database.users);
}); // use postman to send a GET request to localhost:3000/ and we will receive 'this is working' as the response - Update

// - Signin route
app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success'); // checking the request email and password information matches our database
  } else {
    res.status(400).json('error logging in'); // else send an error message and set the status to 400
  }
}); // POST request to localhost:3000/signin to receive our response

// - Add a new user to our database
app.post('/register', (req, res) => {
  // destructure the request body to give us our user variables
  const { email, name, password } = req.body;
  // we then use our variables to create a new user
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0, // number of times the user has uploaded a picture
    joined: new Date(), // creates a new date when the user is created - a built-in js function
  });
  // we always require a response for express to work
  // we respond with the latest user on our database list
  res.json(database.users[database.users.length - 1]);
}); // Post to /signin with email, password and name as a JSON object (in the same format as our database)

// - Get our user for the homepage
app.get('/profile/:id', (req, res) => {
  // params will return route parameters - in this case /:id
  const { id } = req.params;
  // create a variable to show if our user was found - cannot be const as it will be changed
  let found = false;
  // loop through our users database entries
  database.users.forEach((user) => {
    // if user id === the user id we got from the params
    if (user.id === id) {
      // Update the found variable to true (this is a messy way of doing this actually - could be a .map() for example perhaps. Either way, could be differently but done this way to demonstrate a point)
      found = true;
      // return the user if found
      return res.json(user);
    }
  });
  // if the user is not found we return a 404 (not found) error and an error message
  if (!found) {
    res.status(404).json('not found');
  }
});

// - Update our users image count
app.put('/image', (req, res) => {
  // will use the req.body this time to get the id
  const { id } = req.body;
  // create a variable to show if our user was found - cannot be const as it will be changed
  let found = false;
  // loop through our users database entries
  database.users.forEach((user) => {
    // if user id === the user id we got from the params
    if (user.id === id) {
      // Update the found variable to true (this is a messy way of doing this actually - could be a .map() for example perhaps. Either way, could be differently but done this way to demonstrate a point)
      found = true;
      // increase the entries of the user
      user.entries++;
      // return the user entries count if found
      return res.json(user.entries);
    }
  });
  // if the user is not found we return a 404 (not found) error and an error message
  if (!found) {
    res.status(404).json('not found');
  }
});

// - add a port for our app to listen to (3000), with a console log message to show it is working (even though nodemon kind of does this)
app.listen(3000, () => {
  console.log('app is running on port 3000');
});

// Now to  think about what our App will look like in terms of routes / endpoints. This may change throughout the project but it is worth doing as a start point:

// - / --> res = this is working
// - signin --> POST (user information) = success/fail
// - /register --> POST (user information) = user (object that we will return)
// - /profile/:userId --> GET = user (for the homepage)
// - /image --> PUT = user (updates the user information of number of images posted + the rank they receive compared to other users)
