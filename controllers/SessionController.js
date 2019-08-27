const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const sessions = express.Router();

// GET SESSION
// sessions.get('/', (req, res) => {
//   if(req.session.currentUser !== null || req.session.currentUser !== ''){
//     res.status(200).send({
//       currentUser: req.session.currentUser
//     });
//   } else {
//     res.status(200).send({
//         currentUser: req.session.currentUser
//       });
//   }
// })

// NEW SESSION
sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (!foundUser) {
      res.status(200).json({ error: "Incorrect username or password." });
    } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.status(200).json({
        currentUser: req.session.currentUser
      });
    } else {
      res.status(200).json({ error: err.message });
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
    res.status(200).json(currentSession);
  });
});

module.exports = sessions;
