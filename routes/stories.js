const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const {ensureAuthenticated} = require('../helpers/auth');

// Add Story Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

// Process Add Story
router.post('/', (req, res) => {

  try {
    const newStory = {
      title: req.body.title,
      body: req.body.body,
      user: req.user.id
    }
  
    // Create Story
    new Story(newStory)
      .save()
      .then(story => {
        req.flash('success_msg', 'Added story successfully.');
        res.redirect(`/dashboard`);
      });
  } catch(err) {
    console.log(err)
  }
});

module.exports = router;