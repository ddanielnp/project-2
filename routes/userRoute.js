const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const usersController = require('../controllers/users_controller')

router.get('/', function (req, res) {
  res.render('new/newusers')
})
router.post('/', usersController.create)
// ----------
router.get('/login', function (req, res) {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/users/profile',
  failureRedirect: '/users'
}))
// ----------
router.get('/profile', usersController.show)
// router.get('/profile', function (req, res) {
//   res.render('new/users', {
//     user: req.session.passport.user
//   })
// })

router.get('/update', usersController.update)

router.get('/search', usersController.search)

module.exports = router
