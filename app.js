const express = require('express')
const path = require('path')
// const favicon = require('serve-favicon')
const logger = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const index = require('./routes/index')
const users = require('./routes/users')
const config = require('./config')
const oauth2 = require('./lib/oauth2')


const sectionsApi = require('./routes/api/sections')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ secret: config.sessionSecret }))
app.use(express.static(path.join(__dirname, 'public')))

// caching disabled for every route
// app.use(oauth2.disableCache)

app.use(oauth2.router)

// Routes
app.use('/', index)
app.use('/users', users)

// // APIs
// app.use(cors())
app.use('/api/sections', sectionsApi)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use('/dashboard', (err, req, res) => {
  console.log(err)
  // User should be authenticated! Redirect him to log in.
  res.redirect('/users')
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
