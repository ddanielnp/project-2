const User = require('../models/User')
// const Trainer = require('../models/Trainer')
const request = require('request')

function create (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password,
    location: req.body.user.location
  })

  // newUser.trainers.push(req.body.trainer.id)

  newUser.save(function (err, createdUser) {
    if (err) {
      return res.send(err)
      // req.flash('errors', err.message)
      // next(err)
    }
    res.redirect('users/login')
  })
} // close for create function ----------

function show (req, res) {
  // getting all places from DB
  User.find({'_id': '59730ae43ec5ae1d0ea67ea3'}, function (err, users) {
    if (err) {
      console.log(err)
      return
    }
    res.render('new/users', {
      users: users
    })
  })
} // close for show function ----------

function update (req, res) {
  User.find({'_id': '59730ae43ec5ae1d0ea67ea3'}, function (err, users) {
    if (err) {
      console.log(err)
      return
    }
    res.render('new/updateuser', {
      users: users
    })
  })
}

function search (req, res) {
  User.find({'_id': '59730ae43ec5ae1d0ea67ea3'}, function (err, users) {
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
