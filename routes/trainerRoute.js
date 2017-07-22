const express = require('express')
const router = express.Router()

const trainerController = require('../controllers/trainers_controller')

router.get('/', function (req, res) {
  res.render('new/newtrainers')
})

router.post('/', trainerController.create)

router.get('/login', function (req, res) {
  res.render('login')
})

router.get('/login/:id', trainerController.show)

module.exports = router
