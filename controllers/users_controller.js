const User = require('../models/User')
// const Place = require('../models/Place')
const request = require('request')

function create (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  })

  // newUser.places.push(req.body.place.id)

  newUser.save(function (err, createdUser) {
    if (err) {
      return res.send(err)
      // req.flash('errors', err.message)
      // next(err)
    }
    res.redirect('/users/loggedin')
  })
} // close for create function

module.exports = {
  create
}
