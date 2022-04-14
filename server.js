// import express
const express = require('express');

// create our express app
const app = express();

// we use this below instead of body parser and will need to add this below our express app in most cases
app.use(express.json());

// Create a mock database because we haven't learned how to create a proper one yet
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
  res.send('this is working');
}); // use postman to send a GET request to localhost:3000/ and we will receive 'this is working' as the response

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

// add a port for our app to listen to (3000), with a console log message to show it is working (even though nodemon kind of does this)
app.listen(3000, () => {
  console.log('app is running on port 3000');
});

// Now to  think about what our App will look like in terms of routes / endpoints. This may change throughout the project but it is worth doing as a start point:

// / --> res = this is working
// - signin --> POST (user information) = success/fail
// /register --> POST (user information) = user (object that we will return)
// /profile/:userId --> GET = user
// /image --> PUT = user (updates the user information of number of images posted + the rank they receive compared to other users)
