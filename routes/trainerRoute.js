const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const trainersController = require('../controllers/trainers_controller')

// signup ----------
router.get('/', function (req, res) {
  res.render('trainers/newtrainer')
})

router.post('/', trainersController.create)

// login ----------
router.get('/login', notAuthenticated, function (req, res) {
  res.render('trainers/trainerlogin')
})

router.post('/login', passport.authenticate('local-trainer', {
  successRedirect: '/trainers/profile',
  failureRedirect: '/trainers'
}))
// profile ----------
router.get('/profile', isAuthenticated, trainersController.show)

// update ----------
router.get('/update', isAuthenticated, function (req, res) {
  res.render('trainers/updatetrainer', {
    trainer: req.user
  })
})

router.post('/update', isAuthenticated, trainersController.update)

// search ----------
router.get('/search', isAuthenticated, function (req, res) {
  res.render('trainers/trainerform', {
    trainer: req.user
  })
})

// router.get('/search')
router.post('/search/name', trainersController.searchName)

router.post('/search/location', trainersController.searchLocation)

router.post('/search/all', trainersController.searchAll)

// ---------- delete
router.get('/delete', trainersController.destroy)

// authentication ----------
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
    res.redirect('/trainers/profile')
  }
}

module.exports = router
