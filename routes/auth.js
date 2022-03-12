const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.get('/register', (req, res) => {
  res.render('auth/register')
})

router.post('/login', (req, res) => {
  console.log('Login data ', req.body)
  res.render('auth/login')
})

router.post('/register', (req, res) => {
  console.log('Register data ', req.body)
  res.render('auth/register')
})

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),(req, res) => {
    res.redirect('/dashboard');
  });

router.get('/logout', (req, res) => {
 req.logout();
 res.redirect('/');
});

module.exports = router;