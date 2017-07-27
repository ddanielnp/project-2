require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const passport = require('./config/passport')
const methodOverride = require('method-override')

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/project-2'

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () { // resolve cb
    console.log('connected successfully')
  },
  function (err) { // reject cb
    console.log(err)
  }
)
const app = express()

app.use(session({
  store: new MongoStore({
    url: url
  }),
  secret: 'foo',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use(flash())  // has to be after session

app.locals = {
  GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API
}

// set middleware
app.use(express.static('public'))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
  // helpers: {
  //   toJSON: function (object) {
  //     return JSON.stringify(object)
  //   }}
}))
app.set('view engine', 'handlebars')
// listen to ajax request - json post
app.use(bodyParser.json())
// listen to form data submission
app.use(bodyParser.urlencoded({extended: true}))

const userRoute = require('./routes/userRoute')
const trainerRoute = require('./routes/trainerRoute')

app.get('/', function (req, res) {
  res.render('home', {
    user: req.user
  })
})

// user routes
app.use('/users', userRoute)
// trainer routes
app.use('/trainers', trainerRoute)

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

//
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`project-2 is running on port ${port}`)
})
