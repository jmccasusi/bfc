const express = require('express');
const bcrypt = require('bcrypt');
const users = express.Router();
const User = require('../models/UserModel');

// USERS ARRAY
users.get('/all', (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      res.status(200).json({ error: err.message });
    }
    res.status(200).json({
        foundUsers: foundUsers,
        currentUser: req.session.currentUser
    });
  });
});

// ENCRYPTING PASSWORD
users.post('/', (req, res) => {
  if (req.body.password === req.body.reEnterPassword) {
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    User.create(req.body, (err, createdUser) => {
      if (err) {
        res.status(200).json({ error: err.message });
      }
      res.status(200).json(createdUser);
    });
  } else {
    res.send(200).json({ error: 'Password does not match' });
  }
});

// CREATE
users.post('/', (req, res) => {
  User.create(req.body, (err, newUser) => {
    if (err) {
      res.status(200).json({ error: err.message });
    }
    res.status(200).json(newUser);
  });
});

users.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) {
      res.status(200).json({ error: err.message });
    }
    res.status(200).json(deletedUser);
  });
});

module.exports = users;
