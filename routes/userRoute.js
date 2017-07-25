const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const usersController = require('../controllers/users_controller')
// ---------- signup
router.get('/', function (req, res) {
  res.render('users/newuser')
})

router.post('/', usersController.create)
// ---------- login
router.get('/login', notAuthenticated, function (req, res) {
  res.render('users/userlogin')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/users/profile',
  failureRedirect: '/users'
}))
// ---------- profile
router.get('/profile', isAuthenticated, usersController.show)

// ---------- update
router.get('/update', isAuthenticated, usersController.update)

router.post('/update', isAuthenticated, usersController.update)

// ---------- search
router.get('/search', isAuthenticated, usersController.search)

function isAuthenticated (req, res, next) {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}

function notAuthenticated (req, res, next) {
  if(!req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/users/profile')
  }
}

module.exports = router
