//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const app = express ();
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Controllers
//___________________
const BabyController = require('./controllers/BabiesController.js');

// CORS
const whitelist = ['http://localhost:3000', 'https://bfc-backend-api.herokuapp.com']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))

//___________________
// Middleware
//___________________
app.use(express.json());
app.use('/babies', BabyController);

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/DB_NAME'

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
	console.log('connected to mongo database')
});

//___________________
// Routes
//___________________
// Get route

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port:', PORT));