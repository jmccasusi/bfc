const mongoose = require('mongoose');

const babySchema = new mongoose.Schema ({
    name: {type: String, required: true},
    age: Number,
    weight: String,
    about: String,
    image: {type: String, default: 'https://loremflickr.com/240/120'},
    wins: Number,
    losses: Number
  })

const Babies = mongoose.model('Babies', babySchema);

module.exports = Babies;