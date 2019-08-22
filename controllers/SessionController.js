const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const sessions = express.Router();

// NEW SESSION
sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (!foundUser) {
      res.send('cannot find user');
    } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      res.send('signed in');
    } else {
      res.send('cannot sign in');
    }
    // if (err) {
    //   res.status(400).json({ error: err.message });
    // }
    // res.status(200).send(foundUser);
  });
});

// END SESSION
sessions.delete('/', (req, res) => {
  req.session.destroy((err, currentSession) => {
    if (err) {
      res.status(200).json({ error: err.message });
    }
    res.status(200).send(currentSession);
  });
});

module.exports = sessions;
