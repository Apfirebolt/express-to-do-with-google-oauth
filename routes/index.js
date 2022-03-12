const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Story.find({user:req.user.id})
  .lean()
  .then(stories => {
    res.render('index/dashboard', {
      stories: stories,
      user: req.user.toJSON(),
    });
  }); 
});

module.exports = router;