const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users_controller')

router.get('/', function (req, res) {
  res.render('new/newusers')
})

router.post('/', usersController.create)

router.get('/:id', usersController.show)

router.get('/:id/update', usersController.update)

router.get('/:id/search', usersController.search)

module.exports = router
