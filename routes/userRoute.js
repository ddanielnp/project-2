const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users_controller')

router.get('/', function (req, res) {
  res.render('new/newusers')
})

router.post('/', usersController.create)

router.get('/login', function (req, res) {
  res.render('login')
})

router.get('/login/:id', usersController.show)

router.get('/login/:id/update', usersController.update)

router.get('/login/:id/search', usersController.search)

module.exports = router
