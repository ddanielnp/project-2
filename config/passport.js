const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

// it will store into the session , currently logged in user
// when success => next(null, foundUser)
passport.serializeUser(function (user, next) {
  next(null, user.id)
})

// it will open the session, and convert id stored in session into the actual user object, accessible in req.user
passport.deserializeUser(function (id, next) {
  User.findById(id, function (err, user) {
    next(err, user)
  })
})

// verify user login
passport.use(
  new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
    passReqToCallback: true
  },
    localVerify
  ))

function localVerify (req, userEmail, userPassword, next) {
  User
  .findOne({
    email: userEmail
  })
  .exec(function (err, foundUser) {
    if (err) {
      console.log('err', err)
      return next(err) // goes to failureRedirect
    }
    console.log('userEmail', userEmail)
    console.log('userPassword', userPassword)
    if (foundUser && foundUser.validPassword(userPassword)) {
      console.log('success, redirect to /profile')
      next(null, foundUser) // goes to successRedirect
    } else {
      next(null)
    }
  })
} // close for localVerify

module.exports = passport
