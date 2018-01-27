const express = require('express')
const google = require('googleapis')
const config = require('../config')

const router = express.Router()
let oauth2Client = null

function init() {
  oauth2Client = new google.auth.OAuth2(
    config.googleClientId,
    config.googleClientSecret,
    config.googleRedirectUrl,
  )
}

function getUrl(scope) {
  return oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    scope,
  })
}

// retrieve an access token
function getAccessToken(callback) {
  // retrieve user profile
  const plus = google.plus('v1')
  plus.people.get({
    userId: 'me',
    auth: oauth2Client,
  }, (err, response) => {
    callback(err || response)
  })
}

// [Start callback]
router.get('/oauth2callback', (req, res) => {
  if (req.query.code) {
    oauth2Client.getToken(req.query.code, (err, tokens) => {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if (!err) {
        oauth2Client.setCredentials({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        })
        getAccessToken((result) => {
          req.session.user = result.data
          res.redirect('/users/dashboard')
        })
      }
    })
  } else {
    res.redirect('/users')
  }
})

// [Start middleware]
function authRequired(req, res, next) {
  if (req.session.user) {
    next() // If session exists, proceed to page
  } else {
    res.redirect('/users')
  }
}

function disableCache(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  next()
}
// [End middleware]

module.exports = {
  init,
  router,
  getUrl,
  authRequired,
  disableCache,
}
