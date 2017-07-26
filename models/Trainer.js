const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

const trainerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please type your name'],
    minlength: [3, 'Name must be between 3 and 15 characters'],
    maxlength: [20, 'Name must be between 3 and 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Please type your email'],
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  password: {
    type: String,
    minlength: [8, 'Password must be between 8 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters']
  },
  location: String,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

trainerSchema.pre('save', function (next) {
  var trainer = this
  // Only hash the password if it has been modified (or is new)
  if (!trainer.isModified('password')) return next()

// hash the password asynchronously
  bcrypt.hash(trainer.password, 10, function (err, hash) {
    if (err) return next(err)
  // Override the cleartext password with the hashed one
    trainer.password = hash
    next()
  })
})

trainerSchema.methods.validPassword = function (givenPassword) {
  return bcrypt.compareSync(givenPassword, this.password)
}

const Trainer = mongoose.model('Trainer', trainerSchema)

module.exports = Trainer
