const Trainer = require('../models/Trainer')
// const User = require('../models/User')
const request = require('request')

function create (req, res) {
  var newTrainer = new Trainer({
    name: req.body.trainer.name,
    email: req.body.trainer.email,
    password: req.body.trainer.password,
    location: req.body.trainer.location
  })

  // newTrainer.users.push(req.body.user.id)

  newTrainer.save(function (err, createdTrainer) {
    if (err) {
      return res.send(err)
      // req.flash('errors', err.message)
      // next(err)
    }
    res.redirect('trainers/login')
  })
} // close for create function ----------

function show (req, res) {
  // getting all places from DB
  Trainer.find({'_id': req.session.passport.trainer}, function (err, trainers) {
    if (err) {
      console.log(err)
      return
    }
    res.render('trainers/trainerpage', {
      trainers: trainers
    })
  })
} // close for show function ----------

function update (req, res) {
  Trainer.find({'_id': '59730ce114f06b1d77db8163'}, function (err, trainers) {
    if (err) {
      console.log(err)
      return
    }
    res.render('new/updatetrainer', {
      trainers: trainers
    })
  })
} // close for update function ----------

function search (req, res) {
  Trainer.find({'_id': '59730ce114f06b1d77db8163'}, function (err, users) {
    if (err) {
      console.log(err)
      return
    }
    res.render('form', {
      users: users
    })
  })
} // close for search function ----------

module.exports = {
  create,
  show,
  update,
  search
}
