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
  // User.findById(req.user.id, function (err, user) {
  //   if (err) {
  //     console.log(err)
  //     return
  //   }
  // })
  res.render('users/userpage', {
    user: req.user
  })
} // close for show function ----------

function update (req, res) {
  // User.find({'_id': req.user}, function (err, users) {
  //   if (err) {
  //     console.log(err)
  //     return
  //   }
    res.render('users/updateuser', {
      user: req.user
    })
  // })
} // close for update function ----------

function search (req, res) {
  // User.find({'_id': req.user}, function (err, users) {
  //   if (err) {
  //     console.log(err)
  //     return
  //   }
    res.render('users/userform', {
      user: req.user
    })
  // })
  // newUser.trainers.push(req.body.trainer.id)

} // close for search function ----------

module.exports = {
  create,
  show,
  update,
  search
}
