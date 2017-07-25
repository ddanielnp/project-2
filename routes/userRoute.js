const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const usersController = require('../controllers/users_controller')

router.get('/', function (req, res) {
  res.render('users/newuser', {
    user: req.user
  })
})
router.post('/', usersController.create)
// ----------
router.get('/login', function (req, res) {
  res.render('users/userlogin')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/users/profile',
  failureRedirect: '/users'
}))
// ----------
// router.get('/profile', (req, res) => {
//   res.send({
//     user: req.user
//   })
// })
router.get('/profile', isAuthenticated, usersController.show)

router.get('/update', isAuthenticated, usersController.update)

router.get('/search', isAuthenticated, usersController.search)

function isAuthenticated (req, res, next) {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = router
