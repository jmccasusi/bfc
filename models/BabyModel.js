const mongoose = require('mongoose');

const babySchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  weight: String,
  about: String,
  image: {
    type: String,
    default: 'https://cdn.dribbble.com/users/6060/screenshots/1538411/1.png'
  },
  wins: Number,
  losses: Number,
  userId: String
});

const Babies = mongoose.model('Babies', babySchema);

module.exports = Babies;
