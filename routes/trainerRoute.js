const express = require('express')
const router = express.Router()

const trainerController = require('../controllers/trainers_controller')

router.get('/', function (req, res) {
  res.render('new/newtrainers')
})

router.post('/', trainerController.create)

router.get('/:id', trainerController.show)

module.exports = router
