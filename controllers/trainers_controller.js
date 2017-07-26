const Trainer = require('../models/Trainer')
const User = require('../models/User')
const request = require('request')

function create (req, res) {
  var newTrainer = new Trainer({
    name: req.body.trainer.name,
    email: req.body.trainer.email,
    password: req.body.trainer.password,
    location: req.body.trainer.location
  })

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
  res.render('trainers/trainerpage', {
    trainer: req.user
  })
} // close for show function ----------

function update (req, res) {
  // res.send(req.user)
  Trainer.findOneAndUpdate({_id: req.trainer.id},
    { $set:
    {
      password: req.body.trainer.password,
      email: req.body.trainer.email,
      location: req.body.trainer.location
    }
    }, function (err, data) {
      if (err) {
        console.log(err)
      }
      res.redirect('/trainers/profile')
    })
} // close for update function ----------

// function search (req, res) {
//   res.render('trainers/trainerform', {
//     trainer: req.user
//   })
// } // close for search function ----------

function searchName (req, res) {
  // res.send(req.body.search.name)
  User
    .find({
      name: req.body.search.name
    })
    .exec(function (err, data) {
      if (err) return res.send(err)
      res.render('trainers/searchname', {
        user: data
      })
    })
} // close for searchName function ----------

function searchLocation (req, res) {
  // res.send('search location')
  User
    .find({
      location: req.body.search.location
    })
    .exec(function (err, data) {
      if (err) return res.send(err)
      res.render('trainers/searchlocation', {
        user: data
      })
    })
} // close for searchLocation function ----------

function searchAll (req, res) {
  // res.send('search all')
  User
    .find({})
    .exec(function (err, data) {
      if (err) return res.send(err)
      res.render('trainers/searchall', {
        users: data
      })
    })
} // close for searchAll function ----------

function destroy (req, res) {
  Trainer.findOneAndRemove({_id: req.user.id}, function (err, data) {
    if (err) {
      console.log(err)
    }
    res.redirect('/')
  })
}

module.exports = {
  create,
  show,
  update,
  searchName,
  searchLocation,
  searchAll,
  destroy
}
