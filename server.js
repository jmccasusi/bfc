// Test

//___________________
//Dependencies
//___________________
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const secret = process.env.SECRET;
const cors = require('cors');
const app = express();
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment

const PORT = process.env.PORT || 3003;

//___________________
//Controllers
//___________________
const BabyController = require('./controllers/BabyController');
const UsersController = require('./controllers/UserController');
const SessionsController = require('./controllers/SessionController');

// CORS
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3003',
  'https://bfc-backend-api.herokuapp.com'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors());

//___________________
// Middleware
//___________________
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(cookieParser('secret'));

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use('/babies', BabyController);
app.use('/users', UsersController);
app.use('/sessions', SessionsController);

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/DB_NAME';

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log('connected to mongo database');
});
mongoose.Promise = global.Promise;


//___________________
// Routes
//___________________
// Get route

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port:', PORT));
