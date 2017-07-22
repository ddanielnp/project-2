const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const trainerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please type your name']
  },
  email: {
    type: String,
    required: [true, 'Please type your email']
  },
  password: String,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const Trainer = mongoose.model('Trainer', trainerSchema)

module.exports = Trainer
