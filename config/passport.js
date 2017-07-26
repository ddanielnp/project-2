const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const Trainer = require('../models/Trainer')

// it will store into the session , currently logged in user
// when success => next(null, foundUser)
passport.serializeUser(function (user, next) {
  next(null, user.id)
})

// it will open the session, and convert id stored in session into the actual user object, accessible in req.user
passport.deserializeUser(function (id, next) {
  User.findById(id, function (err, user) {
    if (user) {
      next(err, user)
    } else {
      Trainer.findById(id, function (err, trainer) {
        next(err, trainer)
      })
    }
  })
})

// verify user login
passport.use('local-client',
new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
  passReqToCallback: true
},
    localVerifyClient
  ))

passport.use('local-trainer',
  new LocalStrategy({
    usernameField: 'trainer[email]',
    passwordField: 'trainer[password]',
    passReqToCallback: true
  },
      localVerifyTrainer
    ))

function localVerifyClient (req, userEmail, userPassword, next) {
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
} // close for localVerifyClient

function localVerifyTrainer (req, trainerEmail, trainerPassword, next) {
  Trainer
  .findOne({
    email: trainerEmail
  })
  .exec(function (err, foundUser) {
    if (err) {
      console.log('err', err)
      return next(err) // goes to failureRedirect
    }
    console.log('trainerEmail', trainerEmail)
    console.log('trainerPassword', trainerPassword)
    if (foundUser && foundUser.validPassword(trainerPassword)) {
      console.log('success, redirect to /profile')
      next(null, foundUser) // goes to successRedirect
    } else {
      next(null)
    }
  })
} // close for localVerifyTrainer

module.exports = passport
