const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const trainersController = require('../controllers/trainers_controller')

router.get('/', function (req, res) {
  res.render('trainers/newtrainer')
})

router.post('/', trainersController.create)
// ----------
router.get('/login', function (req, res) {
  res.render('trainers/trainerlogin')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/trainers'
}))
// ----------
router.get('/profile', trainersController.show)
// router.get('/profile', function (req, res) {
//   res.render('new/users', {
//     user: req.session.passport.user
//   })
// })

router.get('/update', trainersController.update)

router.get('/search', trainersController.search)

module.exports = router
