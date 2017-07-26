const User = require('../models/User')
const Trainer = require('../models/Trainer')
const request = require('request')

function create (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password,
    location: req.body.user.location
  })

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
  res.render('users/userpage', {
    user: req.user
  })
} // close for show function ----------

  // User.findOneAndUpdate({_id: req.user.id}, {
  //   var updatedUser = new User({

function update (req, res) {
  // res.send(req.user)
  User.findOneAndUpdate({_id: req.user.id},
    { $set:
    {
      password: req.body.user.password,
      email: req.body.user.email,
      location: req.body.user.location,
      height: req.body.user.height,
      weight: req.body.user.weight
    }
    }, function (err, data) {
      if (err) {
        console.log(err)
      }
      res.redirect('/users/profile')
    })

  // var updatedUser = new User({
  // })
  //
  // updatedUser.save
  //

  // }, function (err, data) {
  //   if (err) {
  //     return res.send(err)
  //   }
  //   res.redirect('/users/profile')
  // })

  // updatedUser.save(function (err, createdUser) {
  //   if (err) {
  //     return res.send(err)
  //     // req.flash('errors', err.message)
  //     // next(err)
  //   }
  //   res.redirect('users/profile')
  // })
} // close for update function ----------

function search (req, res) {
  res.render('users/userform', {
    user: req.user
  })
  // newUser.trainers.push(req.body.trainer.id)
} // close for search function ----------

module.exports = {
  create,
  show,
  update,
  search
}
