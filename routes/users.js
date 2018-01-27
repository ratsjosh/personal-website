const express = require('express')
const oAuth2 = require('../lib/oauth2')

const router = express.Router()

const scopes = {
  GOOGLE_PLUS: 'https://www.googleapis.com/auth/plus.me',
}
/* GET /users */
router.get('/', (req, res) => {
  const login = oAuth2.getUrl(scopes.GOOGLE_PLUS)
  res.render('users/content', {
    login,
  })
})

router.get('/dashboard', oAuth2.authRequired, (req, res) => {
  const { user } = req.session
  console.log(req.session)
  res.render('users/content', {
    user,
  })
})

router.get('/logout', oAuth2.authRequired, (req, res) => {
  req.session.destroy()
  res.redirect('/users')
})

module.exports = router
