const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// Stories Index
router.get('/', (req, res) => {
  Story.find({status:'public'})
    .populate('user')
    .sort({date:'desc'})
    .then(stories => {
      res.render('stories/index', {
        stories: stories
      });
    });
});

// Show Single Story
router.get('/show/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
  .populate('user')
  .populate('comments.commentUser')
  .then(story => {
    if(story.status == 'public'){
      res.render('stories/show', {
        story:story
      });
    } else {
      if(req.user){
        if(req.user.id == story.user._id){
          res.render('stories/show', {
            story:story
          });
        } else {
          res.redirect('/stories');
        }
      } else {
        res.redirect('/stories');
      }
    }
  });
});

// List stories from a user
router.get('/user/:userId', (req, res) => {
  Story.find({user: req.params.userId, status: 'public'})
    .populate('user')
    .then(stories => {
      res.render('stories/index', {
        stories:stories
      });
    });
});

// Logged in users stories
router.get('/my', ensureAuthenticated, (req, res) => {
  Story.find({user: req.user.id})
    .populate('user')
    .then(stories => {
      res.render('stories/index', {
        stories:stories
      });
    });
});

// Add Story Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

// Process Add Story
router.post('/', (req, res) => {
  let allowComments;

  if(req.body.allowComments){
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments:allowComments,
    user: req.user.id
  }

  // Create Story
  new Story(newStory)
    .save()
    .then(story => {
      res.redirect(`/stories/show/${story.id}`);
    });
});

module.exports = router;