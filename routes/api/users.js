const _ = require('lodash')
const express = require('express')

const router = express.Router()

// GET: /
router.get('/', async (req, res, next) => {
  try {
    const { user } = req.session
    console.log(req.session)
    if (!user) {
      res.status(401).send()
    } else {
      next()
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
