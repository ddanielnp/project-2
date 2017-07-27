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

router.post('/login', passport.authenticate('local-client', {
  successRedirect: '/users/profile',
  failureRedirect: '/users'
}))
// ---------- profile
router.get('/profile', isAuthenticated, usersController.show)

// ---------- update
router.get('/update', isAuthenticated, function (req, res) {
  res.render('users/updateuser', {
    user: req.user
  })
})

router.post('/update', isAuthenticated, usersController.update)

// ---------- search
router.get('/search', isAuthenticated, function (req, res) {
  res.render('users/userform', {
    user: req.user
  })
})

// router.get('/search', )
router.post('/search/name', isAuthenticated, usersController.searchName)

router.post('/search/location', isAuthenticated, usersController.searchLocation)

router.post('/search/all', isAuthenticated, usersController.searchAll)

// ---------- delete
router.post('/delete', isAuthenticated, usersController.destroy)

//
router.post('/updateUser', isAuthenticated, usersController.reference)

// ---------- authentication
function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}

function notAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/users/profile')
  }
}

module.exports = router
