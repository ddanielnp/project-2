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

router.get('/login/:id/update', trainerController.update)

router.get('/login/:id/search', trainerController.search)

module.exports = router
