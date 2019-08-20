const express = require('express');
// const bcrypt = require('bcrypt');
const babies = express.Router();

// MODELS
const Babies = require('../models/BabyModel.js');
const BabySeedData = require('../models/BabySeedData.js');

// ROUTES
// Get all babies route
babies.get('/all', (req, res) => {
    Babies.find({}, (err, foundBabies) => {
        if(err) {
            res.status(400).json({error: err.message})
        } 
        res.status(200).send(foundBabies);
    })
})

// Get random baby route
babies.get('/random', (req, res) => {
    Babies.find({}, (err, foundBabies) => {
        if(err) {
            res.status(400).json({error: err.message})
        } 
        res.status(200).send(foundBabies[Math.floor(Math.random() * foundBabies.length)]);
    })
})

// Seed route
// babies.get('/seed', (req, res) => {
//     Babies.create(BabySeedData, (err, createdBabies) => {
//         console.log('Successfully seeded some data');
//         res.redirect('/babies/all');
//     })
// })

// Get specific baby route
babies.get('/:id' , (req, res) => {
    Babies.findOne({_id: req.params.id}, (err, foundBaby) => {
        if(err) {
            res.status(400).json({error: err.message})
        } 
        res.status(200).send(foundBaby);
    })
})

// Post route
babies.post('/new', (req, res) => {
    Babies.create(req.body, (err, newBaby) => {
        if(err) {
            res.status(400).json({error: err.message})
        } 
        res.status(200).send(newBaby);
    })
})

// Delete route
babies.delete('/:id', (req, res) => {
    Babies.findByIdAndRemove(req.params.id, (err, deletedBaby) => {
        if(err) {
            res.status(400).json({error: err.message})
        } 
        res.status(200).json(deletedBaby);
    })
})

// Update route
babies.put('/:id', (req, res) => {
    Babies.findByIdAndUpdate(req.params.id, req.body, (err, updatedBaby) => {
        if(err) {
            res.status(400).json({error: err.message})
        } 
        res.status(200).send(updatedBaby);
    })
})

module.exports = babies;