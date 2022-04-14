// import express
const express = require('express');

// create our express app
const app = express();

app.get('/', (req, res) => {
  res.send('this is working');
}) // use postman to send a GET request to localhost:3000/ and we will receive 'this is working' as the response

// add a port for our app to listen to (3000), with a console log message to show it is working (even though nodemon kind of does this)
app.listen(3000, () => {
  console.log('app is running on port 3000');
});

// Now to  think about what our App will look like in terms of routes / endpoints. This may change throughout the project but it is worth doing as a start point:

/*
/ --> res = this is working
/signin --> POST (user information) = success/fail
/register --> POST (user information) = user (object that we will return)
/profile/:userId --> GET = user
/image --> PUT = user (updates the user information of number of images posted + the rank they receive compared to other users)

*/
