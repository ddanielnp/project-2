require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const flash = require('connect-flash')

const url = process.env.MLAB_URI || 'mongodb://localhost:27017/project-2'

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

// set middleware
app.use(express.static('public'))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
// listen to ajax request - json post
app.use(bodyParser.json())
// listen to form data submission
app.use(bodyParser.urlencoded({extended: true}))
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   store: new MongoStore({
//     url: process.env.MLAB_URI
//   })
// }))
// app.use(flash())

const userRoute = require('./routes/userRoute')
// const xxRoute = require('./routes/xxRoute')

app.get('/', function (req, res) {
  res.render('home')
})

app.use('/users', userRoute)

app.get('/trainers', function (req, res) {
  res.render('./new/newtrainers')
})

app.get('/login', function (req, res) {
  res.render('login')
})

//
const port = 3000
app.listen(port, function () {
  console.log(`express is running on ${port}`)
})
