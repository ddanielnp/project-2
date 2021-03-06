const User = require('../models/User')
const Trainer = require('../models/Trainer')
const request = require('request')
const geocoder = require('geocoder')

function create (req, res) {
  geocoder.geocode(`${req.body.user.location}`, function (err, data) {
    if (err) return next(err, null)
    var latitude = data.results[0].geometry.location.lat
    var longitude = data.results[0].geometry.location.lng

    var newUser = new User({
      name: req.body.user.name,
      email: req.body.user.email,
      password: req.body.user.password,
      location: req.body.user.location,
      geometry: [latitude, longitude]
    })

    newUser.save(function (err, createdUser) {
      if (err) {
        return res.send(err)
      // req.flash('errors', err.message)
      // next(err)
      }
      res.redirect('/users/login')
    })
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
  User.findOneAndUpdate({
    _id: req.user.id
  }, {
    $set: {
      password: req.body.user.password,
      email: req.body.user.email,
      location: req.body.user.location,
      height: req.body.user.height,
      weight: req.body.user.weight
    }
  }, function (err, data) {
    if (err) {
      return res.send(err)
    }
    res.redirect('/users/profile')
  })
} // close for update function ----------

function searchName (req, res) {
  // res.send(req.body.search.name)
  Trainer
    .find({
      name: req.body.search.name
    })
    .exec(function (err, data) {
      if (err) return res.send(err)
      res.render('users/searchname', {
        trainer: data
      })
    })
} // close for searchName function ----------

function searchLocation (req, res) {
  // res.send('search location')
  Trainer
    .find({
      location: req.body.search.location
    })
    .exec(function (err, data) {
      if (err) return res.send(err)
      res.render('users/searchlocation', {
        trainer: data
      })
    })
} // close for searchLocation function ----------

function searchAll (req, res) {
  var showAll = []
  var trainersId = req.user
  // res.send('search all')
  Trainer
    .find({})
    .exec(function (err, data) {
      if (err) return res.send(err)
      res.render('users/searchall', {
        trainers: data
      })
    })
} // close for searchAll function ----------

function destroy (req, res) {
  User.findOneAndRemove({_id: req.user.id}, function (err, data) {
    if (err) {
      console.log(err)
    }
    res.redirect('/')
  })
}

function reference (req, res) {
  // res.send(req.body)
  User.findOne({_id: req.user.id}, function (err, data) {
    if (err) res.send(err)

    if (!data.trainers.includes(`${req.body.id}`)) {
      data.trainers.push(req.body.id)
      data.save()
    }
    res.send(data)
  })
}

module.exports = {
  create,
  show,
  update,
  searchName,
  searchLocation,
  searchAll,
  destroy,
  reference
}
